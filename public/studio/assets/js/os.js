// DT+C OS: the small operating system inside the left monitor. Plain DOM, drawn at full resolution.
import { PROJECTS, STUDIO, REEL, SERIES_2062, FOLD } from './data.js';

const h = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const svg = d => `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
const ICON = {
  reel: svg('<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 8.2v7.6l6.2-3.8z" fill="currentColor"/>'),
  work: svg('<rect x="3.5" y="3.5" width="7" height="7" rx="2" fill="currentColor"/><rect x="13.5" y="3.5" width="7" height="7" rx="2" fill="currentColor" opacity=".6"/><rect x="3.5" y="13.5" width="7" height="7" rx="2" fill="currentColor" opacity=".6"/><rect x="13.5" y="13.5" width="7" height="7" rx="2" fill="currentColor"/>'),
  s2062: svg('<rect x="6" y="2.5" width="12" height="19" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10.5 9v6l5-3z" fill="currentColor"/>'),
  fold: svg('<path d="M3 5.5l8-2v17l-8 2zM21 5.5l-8-2v17l8 2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>'),
  term: svg('<rect x="2.5" y="4" width="19" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6.5 9.5l3 2.5-3 2.5M12 15h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'),
  paint: svg('<path d="M4 20c2.5 0 4-1.2 4-3.2 0-1.5 1.2-2.6 2.6-2.6L19.5 5a1.8 1.8 0 0 0-2.6-2.5L8 11.6c-2.2.3-3 2-3 3.800 0 1.800-.8 3-2 3.600z" fill="currentColor"/>'),
  drums: svg('<rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor"/><rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" opacity=".45"/><rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" opacity=".45"/><rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor"/>'),
  game: svg('<path d="M8 3L3 21h18L16 3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 5v3M12 11v3.500M12 17.500v2.500" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'),
  notes: svg('<rect x="4.500" y="2.500" width="15" height="19" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'),
  settings: svg('<path d="M4 7h10M18 7h2M4 17h2M10 17h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="7" r="2.500" fill="currentColor"/><circle cx="8" cy="17" r="2.500" fill="currentColor"/>'),
  book: svg('<path d="M4 5.500A2.500 2.500 0 0 1 6.500 3h11A2.500 2.500 0 0 1 20 5.500v8a2.500 2.500 0 0 1-2.500 2.500H11l-5 4.500V16A2.500 2.500 0 0 1 4 13.500z" fill="currentColor"/>'),
};
const WALLS = {
  Dusk: 'linear-gradient(180deg,#1b1140 0%,#7a2a78 46%,#ff7a59 76%,#ffc27a 100%)',
  'Bay night': 'radial-gradient(120% 80% at 70% 100%,#0b4a52 0%,#0a1630 50%,#07070f 100%)',
  Walnut: 'linear-gradient(135deg,#3a1d0e 0%,#6b3516 45%,#2a140a 100%)',
  Neon: 'linear-gradient(135deg,#12061f 0%,#4b0f6b 40%,#0aa79b 100%)',
  Bone: 'linear-gradient(180deg,#efe6da 0%,#d9c9b6 100%)',
};

export function mountOS(root, api) {
  root.innerHTML = '';
  const wall = h('div', 'os-wall'), bar = h('div', 'os-bar'), desk = h('div', 'os-desk'), winsEl = h('div', 'os-wins'), dock = h('nav', 'os-dock'), boot = h('div', 'os-boot');
  dock.setAttribute('aria-label', 'Programs');
  bar.innerHTML = `<div class="os-logo"><span>DT</span><i>+</i><span>C</span> <em>OS</em></div><div class="os-title" id="os-title"></div><div class="os-right"><button type="button" class="os-snd" id="os-snd"></button><span class="os-clock" id="os-clock"></span><button type="button" class="os-exit" id="os-exit">Back to the studio</button></div>`;
  boot.innerHTML = `<div class="ld-mark"><span>DT</span><i>+</i><span>C</span></div><div class="ld-bar"><b></b></div><p>Starting DT+C OS</p>`;
  root.append(wall, desk, winsEl, dock, bar, boot);
  wall.style.background = WALLS.Dusk;
  bar.querySelector('#os-exit').onclick = () => api.exit();
  const snd = bar.querySelector('#os-snd'); const sndLabel = () => { snd.textContent = api.soundOn() ? 'Sound on' : 'Enable sound'; };
  snd.onclick = () => { api.sound(); setTimeout(sndLabel, 30); }; document.addEventListener('dtc-sound', sndLabel); sndLabel();
  const clock = bar.querySelector('#os-clock'); const tick = () => { clock.textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); }; tick(); setInterval(tick, 15000);

  // ---------------------------------------------------------------- window manager
  let z = 10, booted = false, cascade = 0; const wins = new Map();
  const setTitle = t => { bar.querySelector('#os-title').textContent = t || ''; };
  function focus(w) { w.el.style.zIndex = ++z; winsEl.querySelectorAll('.win').forEach(e => e.classList.toggle('front', e === w.el)); setTitle(w.app.name); }
  function closeWin(id) { const w = wins.get(id); if (!w) return; try { w.cleanup && w.cleanup(); } catch (e) { } w.el.remove(); wins.delete(id); const top = [...wins.values()].sort((a, b) => b.el.style.zIndex - a.el.style.zIndex)[0]; top ? focus(top) : setTitle(''); dockState(); }
  function launch(id, arg) {
    const app = APPS[id]; if (!app) return;
    if (app.action) return app.action();
    if (wins.has(id)) { const w = wins.get(id); focus(w); if (arg !== undefined && w.arg) w.arg(arg); return w; }
    api.audio.blip(520, .07, .04);
    const el = h('section', 'win'); el.dataset.app = id; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', app.name);
    const tb = h('header', 'tb', `<span class="dots"><button type="button" class="c" aria-label="Close ${app.name}"></button><button type="button" class="m" aria-label="Fill the screen"></button></span><b>${app.name}</b>`);
    const body = h('div', 'wb'), rs = h('i', 'rs'); el.append(tb, body, rs); winsEl.appendChild(el);
    const full = api.mobile(); const W = root.clientWidth, H = root.clientHeight;
    const [w0, h0] = app.size || [640, 440], ww = Math.min(w0, W - 24), hh = Math.min(h0, H - 150);
    if (full) el.classList.add('full');
    else { el.style.width = ww + 'px'; el.style.height = hh + 'px'; el.style.left = Math.max(12, Math.min(W - ww - 12, (W - ww) / 2 + (cascade % 5 - 2) * 34)) + 'px'; el.style.top = Math.max(46, Math.min(H - hh - 96, 64 + (cascade % 5) * 26)) + 'px'; cascade++; }
    const w = { el, body, app }; wins.set(id, w);
    tb.querySelector('.c').onclick = e => { e.stopPropagation(); closeWin(id); };
    tb.querySelector('.m').onclick = e => { e.stopPropagation(); el.classList.toggle('full'); w.resize && w.resize(); };
    el.addEventListener('pointerdown', () => focus(w));
    drag(tb, el, w); resize(rs, el, w);
    const r = app.mount(body, w, arg) || {}; w.cleanup = r.cleanup; w.resize = r.resize; w.arg = r.arg;
    focus(w); dockState(); return w;
  }
  function drag(tb, el, w) {
    tb.addEventListener('pointerdown', e => {
      if (e.target.closest('button') || el.classList.contains('full')) return;
      const sx = e.clientX, sy = e.clientY, ox = el.offsetLeft, oy = el.offsetTop; tb.setPointerCapture(e.pointerId);
      const mv = ev => { el.style.left = Math.max(-el.offsetWidth + 80, Math.min(root.clientWidth - 80, ox + ev.clientX - sx)) + 'px'; el.style.top = Math.max(38, Math.min(root.clientHeight - 60, oy + ev.clientY - sy)) + 'px'; };
      const up = () => { tb.removeEventListener('pointermove', mv); tb.removeEventListener('pointerup', up); tb.removeEventListener('pointercancel', up); };
      tb.addEventListener('pointermove', mv); tb.addEventListener('pointerup', up); tb.addEventListener('pointercancel', up);
    });
    tb.addEventListener('dblclick', e => { if (!e.target.closest('button')) { el.classList.toggle('full'); w.resize && w.resize(); } });
  }
  function resize(rs, el, w) {
    rs.addEventListener('pointerdown', e => {
      e.stopPropagation(); const sx = e.clientX, sy = e.clientY, ow = el.offsetWidth, oh = el.offsetHeight; rs.setPointerCapture(e.pointerId);
      const mv = ev => { el.style.width = Math.max(300, ow + ev.clientX - sx) + 'px'; el.style.height = Math.max(220, oh + ev.clientY - sy) + 'px'; w.resize && w.resize(); };
      const up = () => { rs.removeEventListener('pointermove', mv); rs.removeEventListener('pointerup', up); rs.removeEventListener('pointercancel', up); };
      rs.addEventListener('pointermove', mv); rs.addEventListener('pointerup', up); rs.addEventListener('pointercancel', up);
    });
  }
  function dockState() { dock.querySelectorAll('button').forEach(b => b.classList.toggle('run', wins.has(b.dataset.app))); }

  // ---------------------------------------------------------------- shared bits
  function video(m, opts = {}) {
    const v = document.createElement('video'); v.controls = true; v.muted = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.preload = 'metadata';
    if (opts.loop) v.loop = true; if (m.poster) v.poster = m.poster; v.src = m.src; return v;
  }
  function projectView(p) {
    const d = h('div', 'pv'); const vids = p.media;
    const stage = h('div', 'stage'); const put = m => { stage.innerHTML = ''; if (m.type === 'image') { const i = new Image(); i.src = m.src; i.alt = p.title + ': ' + m.label; stage.appendChild(i); } else { const v = video(m, { loop: true }); stage.appendChild(v); v.play().catch(() => { }); } };
    put(vids[0]);
    const tabs = h('div', 'chips'); if (vids.length > 1) vids.forEach((m, i) => { const b = h('button', i ? '' : 'on', m.label); b.type = 'button'; b.onclick = () => { tabs.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); put(m); }; tabs.appendChild(b); });
    const txt = h('div', 'txt', `<p class="k">${p.kind}</p><h3>${p.title}</h3>${p.body.map(b => `<p>${b}</p>`).join('')}`);
    const more = h('button', 'os-btn', 'Open the full case study'); more.type = 'button'; more.onclick = () => api.openCase(p.id);
    const cta = h('button', 'os-btn ghost', 'Book a call'); cta.type = 'button'; cta.onclick = () => api.book(); const row = h('div', 'os-row'); row.append(more, cta); txt.appendChild(row);
    d.append(stage, tabs, txt); return d;
  }

  // ---------------------------------------------------------------- programs
  const APPS = {
    reel: {
      name: 'Reel', size: [860, 540], mount(b) {
        b.classList.add('reel'); const stage = h('div', 'stage'), list = h('ol', 'list'); b.append(stage, list); let cur = -1, v;
        const play = i => { cur = (i + REEL.length) % REEL.length; stage.innerHTML = ''; v = video(REEL[cur]); stage.appendChild(v); v.onended = () => play(cur + 1); v.play().catch(() => { }); [...list.children].forEach((li, k) => li.classList.toggle('on', k === cur)); };
        REEL.forEach((m, i) => { const li = h('li', '', `<button type="button"><img src="${m.poster}" alt="" loading="lazy"><span>${m.label}</span></button>`); li.firstChild.onclick = () => play(i); list.appendChild(li); });
        play(0); return { cleanup: () => v && v.pause() };
      },
    },
    work: {
      name: 'Work', size: [900, 580], mount(b, w, arg) {
        b.classList.add('work');
        const grid = () => { b.innerHTML = ''; const g = h('div', 'grid'); PROJECTS.forEach(p => { const m = p.media.find(x => x.type === 'video'); const t = h('button', 'tile', `<img src="${m ? m.poster : p.media[0].src}" alt="" loading="lazy"><b>${p.title}</b><small>${p.kind}</small>`); t.type = 'button'; t.onclick = () => show(p.id); g.appendChild(t); }); b.appendChild(g); };
        const show = id => { const p = PROJECTS.find(x => x.id === id); if (!p) return grid(); b.innerHTML = ''; const back = h('button', 'os-back', 'All work'); back.type = 'button'; back.onclick = grid; b.append(back, projectView(p)); b.scrollTop = 0; };
        arg ? show(arg) : grid(); return { arg: show, cleanup: () => b.querySelectorAll('video').forEach(v => v.pause()) };
      },
    },
    s2062: {
      name: '2062', size: [420, 660], mount(b) {
        b.classList.add('s2062'); const ph = h('div', 'phone'); const v = video(SERIES_2062, { loop: true }); ph.appendChild(v);
        b.append(ph, h('div', 'meta', `<h3>${SERIES_2062.title}</h3><p>${SERIES_2062.line}</p>`)); v.play().catch(() => { });
        return { cleanup: () => v.pause() };
      },
    },
    fold: {
      name: 'Fold Party', size: [820, 600], mount(b) {
        b.classList.add('fold'); let i = 0, timer = null, tab = 'screens';
        const head = h('div', 'fhead', `<img src="${FOLD.icon}" alt="" class="ico"><img src="${FOLD.logo}" alt="Fold Party" class="logo"><div class="chips"><button type="button" class="on" data-t="screens">Screens</button><button type="button" data-t="reel">Reel</button><button type="button" data-t="about">About</button></div>`);
        const view = h('div', 'fview'); b.append(head, view);
        const stop = () => { clearInterval(timer); timer = null; view.querySelectorAll('video').forEach(v => v.pause()); };
        const screens = () => {
          view.innerHTML = `<div class="car"><button type="button" class="nav p" aria-label="Previous">‹</button><div class="slide"></div><button type="button" class="nav n" aria-label="Next">›</button></div><p class="cap"></p><div class="dots"></div>`;
          const slide = view.querySelector('.slide'), cap = view.querySelector('.cap'), dots = view.querySelector('.dots');
          FOLD.screens.forEach((s, k) => { const d = h('button', '', ''); d.type = 'button'; d.setAttribute('aria-label', FOLD.names[k]); d.onclick = () => go(k, true); dots.appendChild(d); });
          const go = (k, user) => { const dir = k > i || (i === FOLD.screens.length - 1 && k === 0) ? 1 : -1; i = (k + FOLD.screens.length) % FOLD.screens.length;
            const im = new Image(); im.src = FOLD.screens[i]; im.alt = 'Fold Party: ' + FOLD.names[i]; im.className = 'in'; im.style.setProperty('--d', dir);
            slide.querySelectorAll('img').forEach(o => { o.className = 'out'; o.style.setProperty('--d', dir); setTimeout(() => o.remove(), 650); }); slide.appendChild(im);
            cap.textContent = FOLD.names[i]; [...dots.children].forEach((d, n) => d.classList.toggle('on', n === i)); if (user) { clearInterval(timer); timer = setInterval(() => go(i + 1), 3200); } };
          view.querySelector('.p').onclick = () => go(i - 1, true); view.querySelector('.n').onclick = () => go(i + 1, true);
          go(i); timer = setInterval(() => go(i + 1), 2800);
        };
        const reel = () => { view.innerHTML = '<div class="stage"></div>'; const v = video(FOLD.reel, { loop: true }); view.firstChild.appendChild(v); v.play().catch(() => { }); };
        const about = () => { view.innerHTML = `<div class="about"><img src="${FOLD.keyart}" alt="Fold Party key art"><div><h3>A party game arcade for one phone</h3><ul>${FOLD.facts.map(f => `<li>${f}</li>`).join('')}</ul><p>Designed, built and launched by DT+C.</p></div></div>`; };
        head.querySelectorAll('[data-t]').forEach(bt => bt.onclick = () => { stop(); tab = bt.dataset.t; head.querySelectorAll('[data-t]').forEach(x => x.classList.toggle('on', x === bt)); ({ screens, reel, about })[tab](); });
        screens(); return { cleanup: stop };
      },
    },
    term: {
      name: 'Terminal', size: [640, 420], mount(b) {
        b.classList.add('term'); const out = h('div', 'out'), line = h('form', 'line', `<span>guest@dtc ~ %</span><input aria-label="Terminal input" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false">`); b.append(out, line);
        const inp = line.querySelector('input'), hist = []; let hi = 0;
        const print = (t, c) => { const p = h('pre', c || '', ''); p.textContent = t; out.appendChild(p); b.scrollTop = b.scrollHeight; return p; };
        const apps = { reel: 'reel', work: 'work', '2062': 's2062', fold: 'fold', foldparty: 'fold', paint: 'paint', drums: 'drums', game: 'game', notes: 'notes', about: 'notes', settings: 'settings' };
        const cmds = {
          help: () => print('Commands:\n  ls              list programs and projects\n  open <name>     open a program or a project\n  reel            play the reel\n  about           who runs this place\n  services        what DT+C does\n  clients         who DT+C has worked with\n  book            book a call\n  render          bake the light\n  date, whoami, echo, clear, exit'),
          ls: () => print('programs/\n  ' + Object.keys(apps).filter(k => !['foldparty', 'about'].includes(k)).join('  ') + '\nprojects/\n  ' + PROJECTS.map(p => p.id).join('  ')),
          open: a => { const k = (a[0] || '').toLowerCase(); if (apps[k]) { launch(apps[k]); print('Opening ' + k + '.'); } else if (PROJECTS.find(p => p.id === k)) { launch('work', k); print('Opening ' + k + '.'); } else print('open: nothing called "' + (a[0] || '') + '". Try ls.', 'err'); },
          reel: () => { launch('reel'); print('Rolling.'); },
          about: () => print(STUDIO.about.join('\n')),
          services: () => print(STUDIO.services.map(s => '  ' + s).join('\n')),
          clients: () => print(STUDIO.clients.join(', ')),
          process: () => print(STUDIO.process.map(p => '  ' + p[0].padEnd(9) + p[1]).join('\n')),
          book: () => { print('Opening the form.'); api.book(); },
          whoami: () => print('A guest in the DT+C studio. Welcome.'),
          date: () => print(new Date().toString()),
          echo: a => print(a.join(' ')),
          clear: () => { out.innerHTML = ''; },
          exit: () => { print('Back to the room.'); setTimeout(() => api.exit(), 300); },
          sudo: () => print('Nice try. The render queue answers to no one.', 'err'),
          rm: () => print('Deleting everything... no. The bake took too long to lose.', 'err'),
          coffee: () => print('Biscayne Coffee, obviously. Brewing.'),
          pwd: () => print('/studio/desk/left-monitor'),
          fold: () => { launch('fold'); print('Pass the phone.'); },
          render: () => { const p = print('Baking light  [                    ]   0%'); let k = 0; const t = setInterval(() => { k += 5; p.textContent = 'Baking light  [' + '#'.repeat(k / 5).padEnd(20) + '] ' + String(k).padStart(3) + '%'; if (k >= 100) { clearInterval(t); print('Done. It was already baked.'); } }, 70); },
        };
        print('DT+C OS terminal. Type help.');
        line.onsubmit = e => { e.preventDefault(); const raw = inp.value.trim(); inp.value = ''; if (!raw) return; hist.push(raw); hi = hist.length; print('guest@dtc ~ % ' + raw, 'cmd'); const [c, ...a] = raw.split(/\s+/); const f = cmds[c.toLowerCase()]; f ? f(a) : print('command not found: ' + c + '. Type help.', 'err'); api.audio.blip(300, .04, .03, 'square'); };
        inp.onkeydown = e => { if (e.key === 'ArrowUp' && hi > 0) { inp.value = hist[--hi]; e.preventDefault(); } else if (e.key === 'ArrowDown') { inp.value = hist[++hi] || ''; hi = Math.min(hi, hist.length); } else if (e.key === 'Tab') { e.preventDefault(); const m = Object.keys(cmds).find(k => k.startsWith(inp.value)); if (m) inp.value = m + ' '; } e.stopPropagation(); };
        b.onclick = () => { if (!getSelection().toString()) inp.focus({ preventScroll: true }); }; if (!api.mobile()) setTimeout(() => inp.focus({ preventScroll: true }), 60);
      },
    },
    paint: {
      name: 'Paint', size: [720, 500], mount(b) {
        b.classList.add('paint'); const bar_ = h('div', 'tools'), wrap = h('div', 'cv'), c = document.createElement('canvas'), x = c.getContext('2d'); wrap.appendChild(c); b.append(bar_, wrap);
        const cols = ['#0c0b10', '#19e6d6', '#ff4fb8', '#ffb26b', '#8f6bff', '#ff5a4d', '#2f7bff', '#f6efe6']; let col = cols[1], sz = 8, er = false, dirty = false;
        cols.forEach((k, i) => { const s = h('button', 'sw' + (i === 1 ? ' on' : '')); s.type = 'button'; s.style.background = k; s.setAttribute('aria-label', 'Colour ' + (i + 1)); s.onclick = () => { col = k; er = false; bar_.querySelectorAll('.sw,.er').forEach(e => e.classList.remove('on')); s.classList.add('on'); }; bar_.appendChild(s); });
        [4, 8, 18].forEach((n, i) => { const s = h('button', 'sz' + (i === 1 ? ' on' : ''), `<i style="width:${n + 2}px;height:${n + 2}px"></i>`); s.type = 'button'; s.setAttribute('aria-label', 'Brush size ' + n); s.onclick = () => { sz = n; bar_.querySelectorAll('.sz').forEach(e => e.classList.remove('on')); s.classList.add('on'); }; bar_.appendChild(s); });
        const eb = h('button', 'tx er', 'Eraser'); eb.type = 'button'; eb.onclick = () => { er = !er; eb.classList.toggle('on', er); }; const cl = h('button', 'tx', 'Clear'); cl.type = 'button'; const sv = h('button', 'tx', 'Save'); sv.type = 'button'; bar_.append(eb, cl, sv);
        const paper = () => { x.fillStyle = '#f6efe6'; x.fillRect(0, 0, c.width, c.height); };
        const hintT = () => { x.fillStyle = 'rgba(12,11,16,.28)'; x.font = `600 ${22 * (devicePixelRatio || 1)}px Inter`; x.textAlign = 'center'; x.fillText('Draw something', c.width / 2, c.height / 2); };
        const fit = () => { const d = Math.min(devicePixelRatio || 1, 2), w = Math.max(50, wrap.clientWidth), hh = Math.max(50, wrap.clientHeight); const old = dirty ? x.getImageData(0, 0, c.width, c.height) : null; c.width = w * d; c.height = hh * d; c.style.width = w + 'px'; c.style.height = hh + 'px'; paper(); if (old) x.putImageData(old, 0, 0); else hintT(); };
        cl.onclick = () => { dirty = false; paper(); hintT(); }; sv.onclick = () => { const a = document.createElement('a'); a.download = 'dtc-paint.png'; a.href = c.toDataURL('image/png'); a.click(); };
        let last = null; const pt = e => { const r = c.getBoundingClientRect(); return [(e.clientX - r.left) * c.width / r.width, (e.clientY - r.top) * c.height / r.height]; };
        c.addEventListener('pointerdown', e => { if (!dirty) { paper(); dirty = true; } c.setPointerCapture(e.pointerId); last = pt(e); x.fillStyle = er ? '#f6efe6' : col; x.beginPath(); x.arc(last[0], last[1], sz * c.width / c.clientWidth / 2, 0, 7); x.fill(); });
        c.addEventListener('pointermove', e => { if (!last) return; const p = pt(e); x.strokeStyle = er ? '#f6efe6' : col; x.lineWidth = sz * c.width / c.clientWidth * (er ? 2.2 : 1); x.lineCap = x.lineJoin = 'round'; x.beginPath(); x.moveTo(last[0], last[1]); x.lineTo(p[0], p[1]); x.stroke(); last = p; });
        const end = () => { last = null; }; c.addEventListener('pointerup', end); c.addEventListener('pointercancel', end);
        requestAnimationFrame(fit); return { resize: fit };
      },
    },
    drums: {
      name: 'Drum pad', size: [680, 470], mount(b) {
        b.classList.add('drums'); const A = api.audio;
        const noise = (dur) => { const c = A.ctx, n = c.createBufferSource(), buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate), d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; n.buffer = buf; return n; };
        const env = (g, t, a, d, lv) => { g.gain.setValueAtTime(.0001, t); g.gain.linearRampToValueAtTime(lv, t + a); g.gain.exponentialRampToValueAtTime(.0001, t + a + d); };
        const V = {
          Kick: t => { const c = A.ctx, o = c.createOscillator(), g = c.createGain(); o.frequency.setValueAtTime(155, t); o.frequency.exponentialRampToValueAtTime(42, t + .16); env(g, t, .002, .32, .9); o.connect(g).connect(A.master); o.start(t); o.stop(t + .4); },
          Snare: t => { const c = A.ctx, n = noise(.25), f = c.createBiquadFilter(), g = c.createGain(); f.type = 'bandpass'; f.frequency.value = 1900; env(g, t, .001, .16, .5); n.connect(f).connect(g).connect(A.master); n.start(t); const o = c.createOscillator(), og = c.createGain(); o.type = 'triangle'; o.frequency.setValueAtTime(210, t); o.frequency.exponentialRampToValueAtTime(150, t + .08); env(og, t, .001, .09, .35); o.connect(og).connect(A.master); o.start(t); o.stop(t + .15); },
          Hat: t => { const c = A.ctx, n = noise(.08), f = c.createBiquadFilter(), g = c.createGain(); f.type = 'highpass'; f.frequency.value = 7500; env(g, t, .001, .045, .28); n.connect(f).connect(g).connect(A.master); n.start(t); },
          Clap: t => { const c = A.ctx; [0, .012, .026].forEach(o_ => { const n = noise(.14), f = c.createBiquadFilter(), g = c.createGain(); f.type = 'bandpass'; f.frequency.value = 1300; f.Q.value = .8; env(g, t + o_, .001, .11, .34); n.connect(f).connect(g).connect(A.master); n.start(t + o_); }); },
          Tom: t => { const c = A.ctx, o = c.createOscillator(), g = c.createGain(); o.frequency.setValueAtTime(190, t); o.frequency.exponentialRampToValueAtTime(95, t + .2); env(g, t, .002, .3, .6); o.connect(g).connect(A.master); o.start(t); o.stop(t + .4); },
          Rim: t => { const c = A.ctx, o = c.createOscillator(), g = c.createGain(); o.type = 'square'; o.frequency.value = 820; env(g, t, .001, .035, .22); o.connect(g).connect(A.master); o.start(t); o.stop(t + .06); },
          Bass: t => { const c = A.ctx, o = c.createOscillator(), f = c.createBiquadFilter(), g = c.createGain(); o.type = 'sawtooth'; o.frequency.value = 55; f.type = 'lowpass'; f.frequency.setValueAtTime(900, t); f.frequency.exponentialRampToValueAtTime(120, t + .3); env(g, t, .004, .34, .45); o.connect(f).connect(g).connect(A.master); o.start(t); o.stop(t + .45); },
          Stab: t => { const c = A.ctx, f = c.createBiquadFilter(), g = c.createGain(); f.type = 'lowpass'; f.frequency.setValueAtTime(2600, t); f.frequency.exponentialRampToValueAtTime(500, t + .4); env(g, t, .005, .5, .16); f.connect(g).connect(A.master);[220, 277.2, 329.6, 415.3].forEach((hz, i) => { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = hz; o.detune.value = (i - 1.5) * 7; o.connect(f); o.start(t); o.stop(t + .6); }); },
        };
        const names = Object.keys(V), keys = ['a', 's', 'd', 'f', 'z', 'x', 'c', 'v'];
        const gate = h('div', 'gate', '<p>The drum pad makes sound.</p><button type="button" class="os-btn">Enable sound</button>'); gate.querySelector('button').onclick = () => { api.sound(); setTimeout(chk, 40); };
        const pads = h('div', 'pads'), seq = h('div', 'seq'), ctl = h('div', 'ctl'); b.append(pads, ctl, seq, gate);
        const chk = () => { gate.hidden = api.soundOn(); }; chk(); document.addEventListener('dtc-sound', chk);
        const hit = (n, el) => { if (!api.soundOn()) return chk(); V[n](A.ctx.currentTime + .001); if (el) { el.classList.remove('hit'); void el.offsetWidth; el.classList.add('hit'); } };
        names.forEach((n, i) => { const p = h('button', 'pad', `<b>${n}</b><kbd>${keys[i].toUpperCase()}</kbd>`); p.type = 'button'; p.addEventListener('pointerdown', e => { e.preventDefault(); hit(n, p); }); pads.appendChild(p); });
        const onKey = e => { if (e.target.closest('input,textarea') || e.repeat) return; const i = keys.indexOf(e.key.toLowerCase()); if (i >= 0 && wins.has('drums')) hit(names[i], pads.children[i]); }; addEventListener('keydown', onKey);
        // 16-step loop for four voices
        const rows = ['Kick', 'Snare', 'Hat', 'Clap'], pat = { Kick: '1000001010000010', Snare: '0000100000001000', Hat: '1010101010101011', Clap: '0000000000001001' }, grid = {};
        rows.forEach(r => { const row = h('div', 'row', `<span>${r}</span>`); grid[r] = []; for (let s = 0; s < 16; s++) { const c_ = h('button', 'st' + (pat[r][s] === '1' ? ' on' : '') + (s % 4 === 0 ? ' b' : '')); c_.type = 'button'; c_.setAttribute('aria-label', r + ' step ' + (s + 1)); c_.onclick = () => c_.classList.toggle('on'); row.appendChild(c_); grid[r].push(c_); } seq.appendChild(row); });
        const playB = h('button', 'os-btn', 'Play loop'); playB.type = 'button'; ctl.append(playB, h('span', '', 'Tap a pad, press its key, or build a loop.'));
        let timer = null, step = 0, next = 0; const spb = 60 / 108 / 4;
        const tickS = () => { if (!api.soundOn()) return; while (next < A.ctx.currentTime + .1) { rows.forEach(r => { if (grid[r][step].classList.contains('on')) V[r](Math.max(next, A.ctx.currentTime)); }); const s = step; setTimeout(() => rows.forEach(r => grid[r].forEach((c_, k) => c_.classList.toggle('now', k === s))), Math.max(0, (next - A.ctx.currentTime) * 1000)); step = (step + 1) % 16; next += spb; } };
        const stopS = () => { clearInterval(timer); timer = null; playB.textContent = 'Play loop'; rows.forEach(r => grid[r].forEach(c_ => c_.classList.remove('now'))); };
        playB.onclick = () => { if (timer) return stopS(); if (!api.soundOn()) return chk(); step = 0; next = A.ctx.currentTime + .05; timer = setInterval(tickS, 25); playB.textContent = 'Stop'; };
        return { cleanup: () => { stopS(); removeEventListener('keydown', onKey); document.removeEventListener('dtc-sound', chk); } };
      },
    },
    game: {
      name: 'Bay Run', size: [520, 620], mount(b) {
        b.classList.add('game'); const c = document.createElement('canvas'), x = c.getContext('2d'); b.appendChild(c); c.tabIndex = 0; c.setAttribute('aria-label', 'Bay Run. Dodge the cones and collect the reels. Arrow keys or tap left and right.');
        let W = 0, H = 0, raf = 0, st = 'idle', lane = 1, lx = 1, items = [], spawn = 0, speed = .55, score = 0, best = 0, t0_ = performance.now(), dash = 0, seed = 5;
        const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
        const fit = () => { const d = Math.min(devicePixelRatio || 1, 2); W = Math.max(60, b.clientWidth); H = Math.max(60, b.clientHeight); c.width = W * d; c.height = H * d; c.style.width = W + 'px'; c.style.height = H + 'px'; x.setTransform(d, 0, 0, d, 0, 0); };
        const startG = () => { st = 'run'; items = []; spawn = 0; speed = .55; score = 0; lane = 1; lx = 1; api.audio.blip(660, .1, .05); };
        const move = d => { if (st !== 'run') return startG(); lane = Math.max(0, Math.min(2, lane + d)); api.audio.blip(d > 0 ? 520 : 440, .05, .03); };
        const key = e => { if (!wins.has('game') || e.target.closest('input,textarea')) return; if (e.key === 'ArrowLeft' || e.key === 'a') { move(-1); e.preventDefault(); } else if (e.key === 'ArrowRight' || e.key === 'd') { move(1); e.preventDefault(); } else if (e.key === ' ' || e.key === 'Enter') { if (st !== 'run') startG(); e.preventDefault(); } };
        addEventListener('keydown', key); c.addEventListener('pointerdown', e => { const r = c.getBoundingClientRect(); move(e.clientX - r.left < r.width / 2 ? -1 : 1); });
        const hor = () => H * .4, px = (l, z) => W / 2 + (l - 1) * W * .3 * (1 - z * .86), py = z => hor() + (H - hor()) * Math.pow(1 - z, 1.7);
        const draw = now_ => {
          raf = requestAnimationFrame(draw); const dt = Math.min(.05, (now_ - t0_) / 1000); t0_ = now_;
          const g = x.createLinearGradient(0, 0, 0, hor()); g.addColorStop(0, '#1b1140'); g.addColorStop(.6, '#8b2f7c'); g.addColorStop(1, '#ff8a5c'); x.fillStyle = g; x.fillRect(0, 0, W, hor());
          x.fillStyle = '#ffd29a'; x.beginPath(); x.arc(W * .5, hor() + 6, W * .12, Math.PI, 0); x.fill();
          x.fillStyle = '#150d26'; let sx = 0, s2 = 9; while (sx < W) { s2 = (s2 * 16807) % 2147483647; const bw = 14 + s2 % 26, bh = 14 + (s2 % 70) * (1 - Math.abs(sx - W / 2) / W); x.fillRect(sx, hor() - bh, bw, bh); sx += bw + 3; }
          const wg = x.createLinearGradient(0, hor(), 0, H); wg.addColorStop(0, '#ff8a5c'); wg.addColorStop(.12, '#5b2a78'); wg.addColorStop(1, '#0b1030'); x.fillStyle = wg; x.fillRect(0, hor(), W, H - hor());
          x.fillStyle = '#16131d'; x.beginPath(); x.moveTo(W / 2 - W * .06, hor()); x.lineTo(W / 2 + W * .06, hor()); x.lineTo(W / 2 + W * .47, H); x.lineTo(W / 2 - W * .47, H); x.fill();
          if (st === 'run') { dash = (dash + dt * speed * 2.2) % 1; speed += dt * .012; }
          x.strokeStyle = 'rgba(246,239,230,.5)'; for (const l of [-.5, .5]) for (let k = 0; k < 9; k++) { const z1 = 1 - ((k + dash) / 9), z0 = z1 - .05; if (z0 < 0) continue; x.lineWidth = 1 + 5 * (1 - z1); x.beginPath(); x.moveTo(px(1 + l, z1), py(z1)); x.lineTo(px(1 + l, z0), py(z0)); x.stroke(); }
          x.strokeStyle = '#19e6d6'; x.lineWidth = 2; for (const l of [-1.52, 1.52]) { x.beginPath(); x.moveTo(px(1 + l, 1), py(1)); x.lineTo(px(1 + l, 0), py(0)); x.stroke(); }
          if (st === 'run') {
            spawn -= dt * speed; if (spawn <= 0) { spawn = .34 + rnd() * .3; const l = Math.floor(rnd() * 3); items.push({ l, z: 1, k: rnd() < .32 ? 'reel' : 'cone' }); if (rnd() < .3) items.push({ l: (l + 1 + Math.floor(rnd() * 2)) % 3, z: 1, k: 'cone' }); }
            for (const it of items) it.z -= dt * speed;
            for (const it of items) if (!it.dead && it.z < .09 && it.z > -.02 && it.l === lane) { it.dead = true; if (it.k === 'reel') { score += 10; api.audio.blip(990, .09, .05); } else { st = 'over'; best = Math.max(best, Math.floor(score)); api.audio.blip(110, .4, .1, 'sawtooth'); } }
            items = items.filter(it => it.z > -.05 && !(it.dead && it.k === 'reel')); score += dt * 6 * speed;
          }
          for (const it of [...items].sort((a, b_) => b_.z - a.z)) { const s = (1 - it.z * .86), X = px(it.l, it.z), Y = py(it.z), u = W * .06 * s;
            if (it.k === 'cone') { x.fillStyle = '#ff7a2f'; x.beginPath(); x.moveTo(X, Y - u * 2.2); x.lineTo(X + u, Y); x.lineTo(X - u, Y); x.fill(); x.fillStyle = '#f6efe6'; x.fillRect(X - u * .55, Y - u * 1.1, u * 1.1, u * .32); }
            else { x.fillStyle = '#ffd86b'; x.beginPath(); x.arc(X, Y - u * 1.2, u * .9, 0, 7); x.fill(); x.fillStyle = '#16131d'; for (let k = 0; k < 5; k++) { x.beginPath(); x.arc(X + Math.cos(k * 1.257 + now_ / 300) * u * .48, Y - u * 1.2 + Math.sin(k * 1.257 + now_ / 300) * u * .48, u * .17, 0, 7); x.fill(); } } }
          lx += (lane - lx) * Math.min(1, dt * 16); const cx = px(lx, .04), cy = py(.04), cw = W * .13, ch = W * .085;
          x.fillStyle = '#19e6d6'; x.beginPath(); x.roundRect(cx - cw / 2, cy - ch, cw, ch, 8); x.fill(); x.fillStyle = '#0c0b10'; x.beginPath(); x.roundRect(cx - cw * .36, cy - ch * .92, cw * .72, ch * .4, 5); x.fill();
          x.fillStyle = '#ff4f6d'; x.fillRect(cx - cw / 2 + 4, cy - 9, 9, 5); x.fillRect(cx + cw / 2 - 13, cy - 9, 9, 5);
          x.fillStyle = '#f6efe6'; x.textAlign = 'left'; x.font = '800 20px Montserrat'; x.fillText(String(Math.floor(score)).padStart(4, '0'), 16, 30); x.textAlign = 'right'; x.font = '500 13px Inter'; x.fillText('Best ' + best, W - 16, 28);
          if (st !== 'run') { x.fillStyle = 'rgba(12,11,16,.55)'; x.fillRect(0, 0, W, H); x.fillStyle = '#f6efe6'; x.textAlign = 'center'; x.font = '800 34px Montserrat'; x.fillText(st === 'over' ? 'Game over' : 'Bay Run', W / 2, H * .42); x.font = '500 15px Inter'; x.fillText(st === 'over' ? 'Score ' + Math.floor(score) + '. Tap or press an arrow to run again.' : 'Dodge the cones. Collect the reels.', W / 2, H * .42 + 30); if (st !== 'over') x.fillText('Tap a side, or press an arrow, to start.', W / 2, H * .42 + 54); }
        };
        requestAnimationFrame(() => { fit(); raf = requestAnimationFrame(draw); });
        return { resize: fit, cleanup: () => { cancelAnimationFrame(raf); removeEventListener('keydown', key); } };
      },
    },
    notes: {
      name: 'About', size: [560, 540], mount(b) {
        b.classList.add('notes');
        b.innerHTML = `<h3>${STUDIO.line}</h3>${STUDIO.about.map(a => `<p>${a}</p>`).join('')}<h4>What we do</h4><ul>${STUDIO.services.map(s => `<li>${s}</li>`).join('')}</ul><h4>How we work</h4><ol>${STUDIO.process.map(p => `<li><b>${p[0]}.</b> ${p[1]}</li>`).join('')}</ol><h4>Clients</h4><p>${STUDIO.clients.join(', ')}.</p><p><a href="${STUDIO.linkedin}" target="_blank" rel="noopener">David Turk on LinkedIn</a></p>`;
        const cta = h('button', 'os-btn', 'Book a call'); cta.type = 'button'; cta.onclick = () => api.book(); b.appendChild(cta);
      },
    },
    readme: {
      name: 'Read me', size: [470, 500], mount(b) {
        b.classList.add('notes'); b.innerHTML = `<h3>You are inside the monitor.</h3><p>This is a small working computer. Windows drag, resize and stack. Ten things to try:</p>`;
        const ul = h('ul', 'try'); [['reel', 'Watch the reel'], ['work', 'Browse the work'], ['s2062', 'Play an episode of 2062'], ['fold', 'Flip through Fold Party'], ['term', 'Type help in the terminal'], ['paint', 'Paint something'], ['drums', 'Build a drum loop'], ['game', 'Play Bay Run'], ['settings', 'Change the wallpaper']].forEach(([id, t]) => { const li = h('li'); const bt = h('button', '', t); bt.type = 'button'; bt.onclick = () => launch(id); li.appendChild(bt); ul.appendChild(li); });
        b.appendChild(ul); b.appendChild(h('p', 'dim', 'Escape, or the button at the top right, takes you back to the room.'));
      },
    },
    settings: {
      name: 'Settings', size: [520, 400], mount(b) {
        b.classList.add('settings'); b.innerHTML = '<h4>Wallpaper</h4>'; const g = h('div', 'walls');
        Object.entries(WALLS).forEach(([n, bg], i) => { const t = h('button', i ? '' : 'on', `<i style="background:${bg}"></i><span>${n}</span>`); t.type = 'button'; t.onclick = () => { wall.style.background = bg; root.classList.toggle('light', n === 'Bone'); g.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === t)); }; g.appendChild(t); });
        b.appendChild(g); b.appendChild(h('h4', '', 'Accent')); const ac = h('div', 'accents');
        ['#19e6d6', '#ff4fb8', '#ffb26b', '#8f6bff'].forEach((c_, i) => { const t = h('button', i ? '' : 'on'); t.type = 'button'; t.style.background = c_; t.setAttribute('aria-label', 'Accent ' + (i + 1)); t.onclick = () => { root.style.setProperty('--acc', c_); ac.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === t)); }; ac.appendChild(t); });
        b.appendChild(ac); b.appendChild(h('h4', '', 'Sound')); const s = h('button', 'os-btn', ''); s.type = 'button'; const lab = () => { s.textContent = api.soundOn() ? 'Turn sound off' : 'Enable sound'; }; lab(); s.onclick = () => { api.sound(); setTimeout(lab, 40); }; b.appendChild(s);
      },
    },
    book: { name: 'Book a call', action: () => api.book() },
  };
  const ORDER = [['reel', 'Reel'], ['work', 'Work'], ['s2062', '2062'], ['fold', 'Fold Party'], ['term', 'Terminal'], ['paint', 'Paint'], ['drums', 'Drum pad'], ['game', 'Bay Run'], ['notes', 'About'], ['settings', 'Settings'], ['book', 'Book a call']];
  const iconOf = id => ICON[id] || ICON.notes;
  ORDER.forEach(([id, label]) => {
    const d = h('button', 'ic', `<i class="g g-${id}">${iconOf(id)}</i><span>${label}</span>`); d.type = 'button'; d.onclick = () => launch(id); desk.appendChild(d);
    const k = h('button', 'dk g-' + id, iconOf(id) + `<span class="tip">${label}</span>`); k.type = 'button'; k.dataset.app = id; k.setAttribute('aria-label', label); k.onclick = () => launch(id); dock.appendChild(k);
  });

  function open(app) {
    if (!booted) {
      booted = true; boot.classList.add('run'); api.audio.blip(440, .5, .04);
      setTimeout(() => { boot.classList.add('done'); launch('readme'); if (app) launch(app); }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 50 : 1500);
      setTimeout(() => boot.remove(), 2300);
    } else if (app) launch(app);
  }
  function close() { winsEl.querySelectorAll('video').forEach(v => v.pause()); const d = wins.get('drums'); if (d && d.cleanup) closeWin('drums'); }
  return { open, close, launch };
}
