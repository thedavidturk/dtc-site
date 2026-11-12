"use client";

import Image from "next/image";
import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { STUDIO_ENTER_URL, enterStudio } from "./enterStudio";

/* ------------------------------------------------------------------ */
/*  The hero picture as a scene. It drifts a little with the pointer,  */
/*  the things you can do inside glow where they sit in the picture,   */
/*  and a note on the evening sky draws an arrow into the room.        */
/* ------------------------------------------------------------------ */

const AR = 1672 / 941; // the picture's own shape

// where things sit in the picture (0-1 across, 0-1 down) and what they do in the studio
const SPOTS = [
  { id: "shelf", u: 0.193, v: 0.415, label: "Open a project" },
  { id: "game", u: 0.495, v: 0.43, label: "Play 2062" },
  { id: "reel", u: 0.86, v: 0.645, label: "Watch the reel" },
];
const NOTE = { u: 0.74, v: 0.1 }; // the note sits on the sky, clear of the skyline
const TARGET = "game"; // where the arrow lands

type Pt = { x: number; y: number };

export default function StudioScene({ src, alt }: { src: string; alt: string }) {
  const frame = useRef<HTMLAnchorElement>(null);
  const noteRef = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [noteH, setNoteH] = useState(96);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 45, damping: 16, mass: 0.6 });
  const y = useSpring(my, { stiffness: 45, damping: 16, mass: 0.6 });

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const read = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (noteRef.current) setNoteH(noteRef.current.offsetHeight);
  }, [size]);

  // the picture covers the frame, pinned to its top edge: where a point of the picture lands
  const at = (u: number, v: number): Pt | null => {
    if (!size) return null;
    const bw = Math.max(size.w, size.h * AR);
    return { x: (size.w - bw) / 2 + u * bw, y: v * (bw / AR) };
  };
  const inView = (p: Pt | null) =>
    !!p && !!size && p.x > 56 && p.x < size.w - 56 && p.y > 56 && p.y < size.h - 150;

  const spots = SPOTS.map((s) => ({ ...s, p: at(s.u, s.v) })).filter((s) => inView(s.p));
  const target = spots.find((s) => s.id === TARGET);
  const n0 = at(NOTE.u, NOTE.v);
  const note = n0 && size ? { x: Math.min(Math.max(n0.x, 180), size.w - 180), y: n0.y } : null; // keep the note inside the frame on narrower screens

  // the arrow: from under the note, a sweep down and to the left that drops onto the target from above
  let arrow: { d: string; head: string } | null = null;
  if (size && note && target?.p) {
    const S = { x: note.x - 48, y: note.y + noteH + 20 };
    const T = target.p;
    const E = { x: T.x + 4, y: T.y - 24 };
    const C1 = { x: S.x - 24, y: S.y + 70 };
    const C2 = { x: E.x + 70, y: E.y - 110 };
    const a = Math.atan2(E.y - C2.y, E.x - C2.x);
    const h = (r: number) => `${E.x + Math.cos(a + r) * 12},${E.y + Math.sin(a + r) * 12}`;
    arrow = {
      d: `M${S.x},${S.y} C${C1.x},${C1.y} ${C2.x},${C2.y} ${E.x},${E.y}`,
      head: `M${h(Math.PI - 0.55)} L${E.x},${E.y} L${h(Math.PI + 0.55)}`,
    };
  }

  const move = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * -22);
    my.set(((e.clientY - r.top) / r.height - 0.5) * -12);
  };
  const leave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <a
      ref={frame}
      href={STUDIO_ENTER_URL}
      onClick={enterStudio}
      onMouseMove={move}
      onMouseLeave={leave}
      aria-label="Enter the studio, an interactive 3D room"
      className="scene relative block h-[70vh] max-h-[760px] min-h-[440px] overflow-hidden"
    >
      <m.div style={{ x, y, scale: reduce ? 1 : 1.04 }} className="absolute inset-0">
        <Image
          src={src}
          data-studio-still=""
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        {arrow && (
          <svg aria-hidden="true" className="scene-arrow" width={size?.w} height={size?.h}>
            <path d={arrow.d} pathLength={1} className="scene-arrow-line" />
            <path d={arrow.head} className="scene-arrow-head" />
          </svg>
        )}
        {note && (
          <span ref={noteRef} aria-hidden="true" className="scene-note" style={{ left: note.x, top: note.y }}>
            <span className="font-anton text-[32px] uppercase leading-none">This isn&rsquo;t a photo</span>
            <span className="scene-note-t">It&rsquo;s our studio, built in 3D. Click anything and step inside.</span>
          </span>
        )}
        {spots.map((s, i) => (
          <span
            key={s.id}
            aria-hidden="true"
            className={`scene-spot${s.id === TARGET ? " is-target" : ""}`}
            style={{ left: s.p!.x, top: s.p!.y, animationDelay: `${0.5 + i * 0.3}s` }}
          >
            <i />
            <span className="scene-spot-l">{s.label}</span>
          </span>
        ))}
      </m.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(16,16,16,0)_62%,rgba(16,16,16,0.7)_86%,#101010_100%)]"
      />
    </a>
  );
}
