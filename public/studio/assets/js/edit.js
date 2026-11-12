// DT+C studio: the edit. The right monitor opens into an editing timeline with the 2062 cut on it.
// Play it, jump between shots, or drag the playhead to scrub.
const $ = (s, r = document) => r.querySelector(s);
const PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v16l14-8z"/></svg>', PAUSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>';

export function mountEdit(root, api) {
  const v = $('#ed-video', root), lane = $('#ed-lane', root), ph = $('#ed-ph', root), tc = $('#ed-tc', root), big = $('#ed-big', root);
  const playB = $('#ed-play', root), muteB = $('#ed-mute', root), shotsEl = $('#ed-shots', root), v1 = $('#ed-v1', root), ruler = $('#ed-ruler', root);
  const CUTS = api.cuts, FALLBACK = api.dur; let raf = 0, open = false, scrub = false, wasPlaying = false, cur = -1;
  const dur = () => (isFinite(v.duration) && v.duration > 0 ? v.duration : FALLBACK);
  const shotAt = t => { let i = 0; for (let k = 0; k < CUTS.length; k++) if (t >= CUTS[k] - .001) i = k; return i; };
  const fmt = t => { const s = Math.floor(t), f = Math.floor((t - s) * 24); return '00:00:' + String(s).padStart(2, '0') + ':' + String(f).padStart(2, '0'); };

  // shots list and the V1 clips
  CUTS.forEach((c, i) => {
    const end = CUTS[i + 1] || FALLBACK, frame = Math.min(35, Math.floor(c + .8));
    const li = document.createElement('li'), b = document.createElement('button'); b.type = 'button';
    b.innerHTML = `<i style="background-position:${(frame / 35 * 100).toFixed(2)}% 0"></i><span><b>Shot ${String(i + 1).padStart(2, '0')}</b><small>${fmt(c)}</small></span>`;
    b.addEventListener('click', () => { seek(c + .02); play(true); });
    li.appendChild(b); shotsEl.appendChild(li);
    const clip = document.createElement('div'); clip.className = 'ed-clip'; clip.style.left = (c / FALLBACK * 100) + '%'; clip.style.width = ((end - c) / FALLBACK * 100) + '%';
    clip.innerHTML = `<span>${String(i + 1).padStart(2, '0')}</span>`; v1.appendChild(clip);
  });
  for (let s = 0; s <= 35; s += 5) { const m = document.createElement('span'); m.style.left = (s / FALLBACK * 100) + '%'; m.textContent = '00:' + String(s).padStart(2, '0'); ruler.appendChild(m); }

  function paint() {
    const t = v.currentTime || 0, d = dur(), k = Math.min(1, t / d);
    ph.style.left = (k * 100) + '%'; tc.textContent = fmt(t); lane.setAttribute('aria-valuenow', t.toFixed(1));
    const i = shotAt(t);
    if (i !== cur) { cur = i; [...shotsEl.children].forEach((li, n) => li.classList.toggle('on', n === i)); [...v1.children].forEach((c, n) => c.classList.toggle('on', n === i)); }
  }
  function loop() { paint(); if (open) raf = requestAnimationFrame(loop); }
  function ui() { const p = !v.paused; playB.innerHTML = p ? PAUSE : PLAY; playB.setAttribute('aria-label', p ? 'Pause' : 'Play'); big.hidden = p || scrub; muteB.textContent = v.muted ? 'Sound off' : 'Sound on'; muteB.setAttribute('aria-pressed', !v.muted); }
  function play(withSound) { if (withSound) v.muted = false; v.play().catch(() => { v.muted = true; v.play().catch(() => { }); }).finally(ui); ui(); }
  function pause() { v.pause(); ui(); }
  function seek(t) { const d = dur(); try { v.currentTime = Math.max(0, Math.min(d - .05, t)); } catch (e) { } paint(); }
  const toggle = () => (v.paused ? play(true) : pause());

  big.addEventListener('click', () => play(true));
  playB.addEventListener('click', toggle);
  v.addEventListener('click', toggle);
  v.addEventListener('play', ui); v.addEventListener('pause', ui); v.addEventListener('volumechange', ui);
  muteB.addEventListener('click', () => { v.muted = !v.muted; ui(); });
  $('#ed-prev', root).addEventListener('click', () => { const t = v.currentTime, i = shotAt(t); seek(CUTS[t - CUTS[i] > .6 ? i : Math.max(0, i - 1)] + .02); });
  $('#ed-next', root).addEventListener('click', () => { const i = shotAt(v.currentTime); seek(CUTS[(i + 1) % CUTS.length] + .02); });
  $('#ed-full', root).addEventListener('click', () => { const f = $('#ed-frame', root); if (document.fullscreenElement) document.exitFullscreen(); else if (f.requestFullscreen) f.requestFullscreen().catch(() => { }); else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen(); });
  $('#ed-x', root).addEventListener('click', () => api.exit());
  $('#ed-book', root).addEventListener('click', () => { pause(); api.book(); });

  // scrubbing: drag anywhere on the timeline
  const at = e => { const r = lane.getBoundingClientRect(); return Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * dur(); };
  lane.addEventListener('pointerdown', e => { scrub = true; wasPlaying = !v.paused; v.pause(); lane.setPointerCapture(e.pointerId); if (v.preload === 'none') { v.preload = 'auto'; v.load(); } seek(at(e)); ui(); e.preventDefault(); });
  lane.addEventListener('pointermove', e => { if (scrub) seek(at(e)); });
  const end = () => { if (!scrub) return; scrub = false; if (wasPlaying) play(false); ui(); };
  lane.addEventListener('pointerup', end); lane.addEventListener('pointercancel', end);
  lane.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') { seek(v.currentTime - (e.shiftKey ? 1 : 1 / 24)); e.preventDefault(); e.stopPropagation(); } if (e.key === 'ArrowRight') { seek(v.currentTime + (e.shiftKey ? 1 : 1 / 24)); e.preventDefault(); e.stopPropagation(); } });
  const onKey = e => {
    if (!open || e.target.closest('input,textarea,select,dialog')) return;
    if (e.key === ' ' || e.key === 'k') { e.preventDefault(); toggle(); }
    else if (e.key === 'ArrowRight' || e.key === 'l') $('#ed-next', root).click();
    else if (e.key === 'ArrowLeft' || e.key === 'j') $('#ed-prev', root).click();
    else if (e.key === 'm') muteB.click();
  };
  addEventListener('keydown', onKey);

  return {
    open(autoplay) {
      open = true; v.pause(); if (v.preload === 'none') v.preload = 'auto'; seek(0); cur = -1; ui(); cancelAnimationFrame(raf); loop();
      if (autoplay) play(false); else big.focus({ preventScroll: true });
    },
    close(resumeMuted) {
      open = false; cancelAnimationFrame(raf); if (document.fullscreenElement) document.exitFullscreen().catch(() => { });
      v.muted = true; if (resumeMuted) v.play().catch(() => { }); else v.pause();
    },
  };
}
