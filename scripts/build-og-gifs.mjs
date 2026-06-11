/**
 * Animated OG share cards for Perspectives articles.
 *
 * For each article: renders the designed card overlay (gradient, accent bar,
 * DT+C mark, PERSPECTIVES label, category, title) as a transparent PNG via
 * Playwright, then composites it over ~2.8s of the article's motion clip with
 * ffmpeg into a palette-optimized 1200x630 GIF.
 *
 * Output: public/og/<slug>.gif — served statically with a correct image/gif
 * content type (the app-router opengraph-image.gif convention serves
 * text/plain in Next 14, which crawlers may reject). Each article's
 * layout.tsx points its og:image here (see write-og-layouts.mjs).
 *
 * The overlay is baked into EVERY frame, so platforms that show a static
 * first frame (LinkedIn, X, iMessage, Facebook) still get the full designed
 * card; platforms that animate og:image GIFs (Slack, Discord, Telegram) play
 * the motion.
 *
 * Usage: node scripts/build-og-gifs.mjs [slug ...]   (no args = all 12)
 */
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { mkdirSync, statSync, rmSync } from "node:fs";
import { join } from "node:path";
import { ARTICLES } from "./og-articles.mjs";

const ROOT = process.cwd();
const TMP = join(ROOT, ".og-gif-tmp");
const MAX_BYTES = 4.5 * 1024 * 1024; // stay under the 5MB crawler limit


/** Mirrors the design of the existing opengraph-image.tsx cards. */
function overlayHtml(category, title) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: transparent; overflow: hidden;
         font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; }
  .frame { position: relative; width: 1200px; height: 630px; display: flex;
           flex-direction: column; justify-content: flex-end; padding: 64px; }
  .shade { position: absolute; inset: 0;
           background: linear-gradient(to top, rgba(11,15,25,0.95) 0%,
                       rgba(11,15,25,0.7) 45%, rgba(11,15,25,0.35) 100%); }
  .bar { position: absolute; top: 0; left: 0; right: 0; height: 8px;
         background: linear-gradient(to right, #6366F1, #F97316); }
  .mark { position: absolute; top: 48px; left: 64px; font-size: 32px;
          font-weight: 800; color: #fff; letter-spacing: -0.02em; }
  .label { position: absolute; top: 54px; right: 64px; font-size: 18px;
           color: #94A3B8; letter-spacing: 0.28em; text-transform: uppercase; }
  .category { position: relative; font-size: 20px; letter-spacing: 0.22em;
              text-transform: uppercase; color: #F97316; }
  .title { position: relative; font-size: 60px; font-weight: 800; color: #fff;
           line-height: 1.05; letter-spacing: -0.02em; margin-top: 16px;
           max-width: 1000px; }
  </style></head><body><div class="frame">
    <div class="shade"></div><div class="bar"></div>
    <div class="mark">DT+C</div><div class="label">Perspectives</div>
    <div class="category">${category}</div>
    <div class="title">${title}</div>
  </div></body></html>`;
}

function probeDuration(file) {
  const out = execFileSync("ffprobe", [
    "-v", "error", "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1", file,
  ]).toString();
  return parseFloat(out) || 0;
}

function encodeGif(clipPath, overlayPath, outPath, { start, duration, fps, colors }) {
  const filter =
    `[0:v]scale=1200:630:force_original_aspect_ratio=increase:flags=lanczos,` +
    `crop=1200:630,fps=${fps},setsar=1[bg];` +
    `[bg][1:v]overlay=0:0:format=auto[v];` +
    `[v]split[a][b];` +
    `[a]palettegen=max_colors=${colors}:stats_mode=diff[p];` +
    `[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle[out]`;
  execFileSync("ffmpeg", [
    "-y", "-v", "error",
    "-ss", String(start), "-t", String(duration), "-i", clipPath,
    "-i", overlayPath,
    "-filter_complex", filter, "-map", "[out]",
    "-loop", "0", outPath,
  ]);
  return statSync(outPath).size;
}

const requested = process.argv.slice(2);
const slugs = requested.length ? requested : Object.keys(ARTICLES);
mkdirSync(TMP, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});

const results = [];
for (const slug of slugs) {
  const art = ARTICLES[slug];
  if (!art) {
    console.error(`unknown slug: ${slug}`);
    continue;
  }
  const clipPath = join(ROOT, "public/motion", art.clip);
  const overlayPath = join(TMP, `${slug}-overlay.png`);
  const outPath = join(ROOT, "public/og", `${slug}.gif`);

  await page.setContent(overlayHtml(art.category, art.title));
  await page.screenshot({ path: overlayPath, omitBackground: true });

  const dur = probeDuration(clipPath);
  // Skip intro fades: start 12% in, but leave room for the segment
  const baseStart = art.start ?? Math.min(dur * 0.12, Math.max(dur - 3.2, 0));

  // Quality ladder: step down until under the size budget
  const ladder = [
    { duration: 2.8, fps: 12, colors: 160 },
    { duration: 2.8, fps: 10, colors: 128 },
    { duration: 2.2, fps: 10, colors: 112 },
    { duration: 1.8, fps: 8, colors: 96 },
  ];
  let size = Infinity;
  let used = null;
  for (const step of ladder) {
    size = encodeGif(clipPath, overlayPath, outPath, { start: baseStart, ...step });
    used = step;
    if (size <= MAX_BYTES) break;
  }

  const mb = (size / 1024 / 1024).toFixed(2);
  const flag = size > MAX_BYTES ? "  !! OVER BUDGET" : "";
  results.push(`${slug}: ${mb}MB @ ${used.fps}fps/${used.duration}s/${used.colors}c${flag}`);
  console.log(results[results.length - 1]);
}

await browser.close();
rmSync(TMP, { recursive: true, force: true });
console.log(`\n${results.length} GIFs written.`);
