import type { MouseEvent as ReactMouseEvent } from "react";
import { STUDIO_URL } from "./studioUrl";

/** The address the homepage sends people to. `enter` tells the studio to
 *  skip its own title screen: the homepage has already made the offer. */
export const STUDIO_ENTER_URL = `${STUDIO_URL}?enter=1`;

/* The studio's own loading screen, so the last frame here is the first
   frame there. */
const VEIL =
  "radial-gradient(120% 90% at 50% 110%, #3a1640 0%, #17101f 45%, #0c0b10 100%)";
const EASE = "cubic-bezier(0.52, 0.01, 0, 1)";
const DIVE = "cubic-bezier(0.7, 0, 0.84, 0)";

let listening = false;

function box(css: string) {
  const d = document.createElement("div");
  d.style.cssText = css;
  return d;
}

function timing(duration: number, delay = 0, easing = EASE): KeyframeAnimationOptions {
  return { duration, delay, easing, fill: "both" };
}

/**
 * Click handler for any link into the studio. The still of the room lifts
 * off the page, fills the screen, then the camera dives through it while
 * the image splits into its prism channels, and the page hands over to the
 * studio on the studio's own loading colours.
 *
 * Modified clicks (new tab) and reduced-motion visitors get a plain link.
 */
export function enterStudio(e: ReactMouseEvent<HTMLAnchorElement>) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const href = e.currentTarget.href;
  e.preventDefault();
  if (document.getElementById("studio-warp")) return;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const still = Array.from(
    document.querySelectorAll<HTMLImageElement>("img[data-studio-still]")
  ).find((el) => {
    const b = el.getBoundingClientRect();
    return b.width > 0 && b.bottom > 40 && b.top < vh - 40;
  });
  const src = still ? still.currentSrc || still.src : "/studio/studio-hero.jpg";
  const from = still
    ? still.getBoundingClientRect()
    : new DOMRect(vw * 0.32, vh * 0.34, vw * 0.36, vh * 0.32);
  const pos = still ? getComputedStyle(still).objectPosition : "50% 50%";
  const radius = still
    ? getComputedStyle(still.parentElement ?? still).borderRadius || "0px"
    : "15px";

  const warp = box(
    "position:fixed;inset:0;z-index:2147483000;overflow:hidden;perspective:1100px;cursor:progress"
  );
  warp.id = "studio-warp";
  warp.setAttribute("aria-hidden", "true");
  const veil = box(`position:absolute;inset:0;background:${VEIL};opacity:0`);
  const frame = box(
    `position:absolute;left:${from.left}px;top:${from.top}px;width:${from.width}px;height:${from.height}px;overflow:hidden;border-radius:${radius};transform-origin:58% 50%;will-change:transform,opacity,filter`
  );
  const bg = `url("${src}") ${pos} / cover no-repeat`;
  const base = box(`position:absolute;inset:0;background:${bg}`);
  const ghost = (colour: string) =>
    box(
      `position:absolute;inset:0;background:${bg}, ${colour};background-blend-mode:multiply;mix-blend-mode:screen;opacity:0`
    );
  const red = ghost("#ff2a2a");
  const cyan = ghost("#2a7fff");
  frame.append(base, red, cyan);
  warp.append(veil, frame);
  document.body.appendChild(warp);

  /* 1. Lift off the page and fill the screen. */
  veil.animate([{ opacity: 0 }, { opacity: 1 }], timing(420));
  frame.animate(
    [
      {
        left: `${from.left}px`,
        top: `${from.top}px`,
        width: `${from.width}px`,
        height: `${from.height}px`,
        borderRadius: radius,
      },
      { left: "0px", top: "0px", width: `${vw}px`, height: `${vh}px`, borderRadius: "0px" },
    ],
    timing(560)
  );
  /* 2. Dive through it; the prism channels pull apart as the speed builds. */
  frame.animate(
    [
      { transform: "translateZ(0px) rotateZ(0deg)", filter: "blur(0px) brightness(1)" },
      { transform: "translateZ(760px) rotateZ(-2.5deg)", filter: "blur(9px) brightness(1.5)" },
    ],
    timing(900, 460, DIVE)
  );
  red.animate(
    [
      { opacity: 0, transform: "translateX(0px)" },
      { opacity: 0.85, transform: "translateX(-34px)" },
    ],
    timing(900, 460, DIVE)
  );
  cyan.animate(
    [
      { opacity: 0, transform: "translateX(0px)" },
      { opacity: 0.85, transform: "translateX(34px)" },
    ],
    timing(900, 460, DIVE)
  );
  /* 3. Let go into the studio's loading colours. */
  frame.animate([{ opacity: 1 }, { opacity: 0 }], timing(320, 1120, "ease-in"));

  /* Coming back with the Back button restores this page as it was left:
     clear the overlay so it is not stuck on screen. */
  if (!listening) {
    listening = true;
    window.addEventListener("pageshow", (ev) => {
      if (ev.persisted) document.getElementById("studio-warp")?.remove();
    });
  }
  const hint = document.createElement("link");
  hint.rel = "prefetch";
  hint.as = "document";
  hint.href = href;
  document.head.appendChild(hint);

  window.setTimeout(() => {
    window.location.href = href;
  }, 1460);
  /* If the studio never answers, give the page back. */
  window.setTimeout(() => document.getElementById("studio-warp")?.remove(), 12000);
}
