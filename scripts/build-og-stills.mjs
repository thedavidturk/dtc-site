/**
 * One-off: static 1200x630 JPEG OG stills, same design pipeline as
 * scripts/build-og-gifs.mjs (Playwright overlay + ffmpeg composite over a
 * frame of the source motion clip). Output: public/og/<slug>.jpg
 */
import { chromium } from "/Users/davidturk/claudeprojects/turks_website/dtc-website/node_modules/playwright/index.mjs";
import { execFileSync } from "node:child_process";
import { mkdirSync, statSync, rmSync } from "node:fs";
import { join } from "node:path";
import { ARTICLES } from "/Users/davidturk/claudeprojects/turks_website/dtc-website/scripts/og-articles.mjs";

const ROOT = "/Users/davidturk/claudeprojects/turks_website/dtc-website";
const TMP = "/private/tmp/claude-501/-Users-davidturk/97ca93df-ae7c-45b1-9eca-a3eacc7448d5/scratchpad/og-still-tmp";

// Same overlay design as build-og-gifs.mjs
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

function encodeJpeg(clipPath, overlayPath, outPath, seek) {
  const filter =
    `[0:v]scale=1200:630:force_original_aspect_ratio=increase:flags=lanczos,` +
    `crop=1200:630,setsar=1[bg];` +
    `[bg][1:v]overlay=0:0:format=auto[out]`;
  execFileSync("ffmpeg", [
    "-y", "-v", "error",
    "-ss", String(seek), "-i", clipPath,
    "-i", overlayPath,
    "-filter_complex", filter, "-map", "[out]",
    "-frames:v", "1", "-q:v", "3", // ~quality 85
    outPath,
  ]);
  return statSync(outPath).size;
}

mkdirSync(TMP, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});

for (const [slug, art] of Object.entries(ARTICLES)) {
  const clipPath = join(ROOT, "public/motion", art.clip);
  const overlayPath = join(TMP, `${slug}-overlay.png`);
  const outPath = join(ROOT, "public/og", `${slug}.jpg`);

  await page.setContent(overlayHtml(art.category, art.title));
  await page.screenshot({ path: overlayPath, omitBackground: true });

  const dur = probeDuration(clipPath);
  // Same as the GIF pipeline's segment start, plus 1.4s (segment midpoint)
  // so the frame is well past any intro fade.
  const baseStart = art.start ?? Math.min(dur * 0.12, Math.max(dur - 3.2, 0));
  const seek = Math.min(baseStart + 1.4, Math.max(dur - 0.1, 0));

  const size = encodeJpeg(clipPath, overlayPath, outPath, seek);
  console.log(`${slug}: ${(size / 1024).toFixed(0)}kB @ t=${seek.toFixed(2)}s`);
}

await browser.close();
rmSync(TMP, { recursive: true, force: true });
console.log("done");
