// DT+C studio: the room. three.js draws a room whose light was baked in Blender (Cycles).
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { PROJECTS, RIG, STUDIO, REEL, byId } from './data.js';
import { openCase, closeCase, caseOpen, hasCase } from './case.js';

const FORM_ENDPOINT = window.DTC_FORM_ENDPOINT || '/';     // Netlify Forms posts to the site root
const Q = new URLSearchParams(location.search);
const FREEZE = Q.has('t') ? parseFloat(Q.get('t')) || 0 : null;
const VIEW = Q.get('view') || 'room';
const html = document.documentElement;
const $ = s => document.querySelector(s);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse = matchMedia('(pointer: coarse)').matches;
const MOBILE = Q.get('tier') ? Q.get('tier') === 'mobile' : (coarse || Math.min(innerWidth, innerHeight) < 600);
const R = 'assets/room/', VER = '?v=19';          // bump VER when the baked maps change
const V3 = THREE.Vector3;
const v3 = a => new V3(a[0], a[1], a[2]);
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const ease = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
const t0 = performance.now();
const now = () => FREEZE !== null ? FREEZE : (performance.now() - t0) / 1000;

// ------------------------------------------------------------------ plain text version (also the no-WebGL fallback)
function buildPlain() {
  $('#plain-work').innerHTML = PROJECTS.map(p => {
    const m = p.media.find(x => x.type === 'video');
    const src = m ? m.poster : p.media[0].src;
    return `<article><img src="${src}" alt="" loading="lazy"><h3>${p.title}</h3><p class="k">${p.kind}</p>${p.body.map(b => `<p>${b}</p>`).join('')}</article>`;
  }).join('');
  $('#plain-about').innerHTML = STUDIO.about.map(a => `<p>${a}</p>`).join('') +
    `<p><strong>Services.</strong> ${STUDIO.services.join(', ')}.</p><p><strong>Process.</strong> ${STUDIO.process.map(p => p[0]).join(', ')}.</p>` +
    `<p><strong>Clients.</strong> ${STUDIO.clients.join(', ')}.</p><p><a href="${STUDIO.linkedin}" rel="noopener" target="_blank">David Turk on LinkedIn</a></p>`;
}
function plainMode(on) {
  html.classList.toggle('plain', on); $('#plain').hidden = !on;
  if (on) { html.classList.add('ready'); scrollTo(0, 0); }
}
buildPlain();
if (coarse) $('#hint').textContent = 'Swipe to look around. Tap anything to open it.';
$('#skip').addEventListener('click', e => { e.preventDefault(); plainMode(true); $('#plain').querySelector('h1').scrollIntoView(); });
$('#plain-x').addEventListener('click', () => plainMode(false));

// ------------------------------------------------------------------ book a call
const book = $('#book'), form = $('#book-form');
function openBook() {
  $('#book-done').hidden = true; form.hidden = false; $('#book-err').textContent = '';
  if (!book.open) book.showModal();
  setTimeout(() => form.elements.name.focus(), 50);
}
function closeBook() { if (book.open) book.close(); }
document.addEventListener('click', e => { if (e.target.closest('#cta,#card-cta,[data-book]')) openBook(); });
$('#book-x').addEventListener('click', closeBook); $('#book-close').addEventListener('click', closeBook);
book.addEventListener('click', e => { if (e.target === book) closeBook(); });
form.addEventListener('submit', async e => {
  e.preventDefault();
  const el = form.elements, err = $('#book-err'); let bad = null;
  const need = [['name', 'Please add your name.'], ['email', 'Please add your email.'], ['project-type', 'Please select a project type.'], ['message', 'Please tell us about your project.']];
  for (const [k] of need) el[k].classList.remove('bad');
  for (const [k, msg] of need) if (!el[k].value.trim()) { bad = bad || [k, msg]; el[k].classList.add('bad'); }
  if (!bad && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.email.value.trim())) { bad = ['email', 'That email address does not look right.']; el.email.classList.add('bad'); }
  if (bad) { err.textContent = bad[1]; el[bad[0]].focus(); return; }
  const btn = $('#book-send'); btn.disabled = true; btn.textContent = 'Sending'; err.textContent = '';
  try {
    const res = Q.get('formtest') === 'ok' ? { ok: true } : await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(form)).toString() });
    if (!res.ok) throw new Error('status ' + res.status);
    form.reset(); form.hidden = true; $('#book-done').hidden = false; $('#book-close').focus();
  } catch (x) {
    err.textContent = 'That did not send. Please try again in a moment.';
  } finally { btn.disabled = false; btn.textContent = 'Send message'; }
});

// ------------------------------------------------------------------ sound (all made in code, silent until asked)
const audio = {
  ctx: null, master: null, on: false, quiet: false,
  enable() {
    if (!this.ctx) {
      const C = window.AudioContext || window.webkitAudioContext; if (!C) return false;
      this.ctx = new C(); this.master = this.ctx.createGain(); this.master.gain.value = .0001; this.master.connect(this.ctx.destination);
    }
    this.ctx.resume(); this.on = true; this.master.gain.setTargetAtTime(this.quiet ? .0001 : .8, this.ctx.currentTime, .4); return true;
  },
  disable() { if (this.ctx) { this.on = false; this.master.gain.setTargetAtTime(.0001, this.ctx.currentTime, .15); } },
  duck(q) {                      // anything with its own soundtrack (a film, the reel, 2062) silences the room's sounds while it plays
    if (q === this.quiet) return; this.quiet = q; if (this.ctx && this.on) this.master.gain.setTargetAtTime(q ? .0001 : .8, this.ctx.currentTime, q ? .08 : .5);
  },
  blip(hz = 660, dur = .08, lv = .05, type = 'sine') {
    if (!this.on) return; const c = this.ctx, o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.value = hz;
    g.gain.setValueAtTime(lv, c.currentTime); g.gain.exponentialRampToValueAtTime(.0001, c.currentTime + dur);
    o.connect(g).connect(this.master); o.start(); o.stop(c.currentTime + dur + .02);
  },
  whoosh(dur = 1.1, up = true) {
    if (!this.on) return; const c = this.ctx, len = c.sampleRate * dur, buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const n = c.createBufferSource(); n.buffer = buf; const f = c.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 1.2;
    f.frequency.setValueAtTime(up ? 180 : 1400, c.currentTime); f.frequency.exponentialRampToValueAtTime(up ? 1500 : 160, c.currentTime + dur);
    const g = c.createGain(); g.gain.setValueAtTime(.0001, c.currentTime); g.gain.linearRampToValueAtTime(.09, c.currentTime + dur * .45); g.gain.linearRampToValueAtTime(.0001, c.currentTime + dur);
    n.connect(f).connect(g).connect(this.master); n.start();
  },
};
// the room goes quiet whenever something with its own sound is playing: any unmuted video, or an Adobe film player on a project page
setInterval(() => audio.duck([...document.querySelectorAll('video')].some(v => !v.paused && !v.muted && v.volume > 0) || !!document.querySelector('#case:not([hidden]) .cs-frame')), 300);
const sndBtn = $('#sound');
sndBtn.addEventListener('click', () => {
  const on = sndBtn.getAttribute('aria-pressed') !== 'true';
  if (on) { if (!audio.enable()) return; audio.blip(880, .12, .06); } else audio.disable();
  sndBtn.setAttribute('aria-pressed', on); sndBtn.setAttribute('aria-label', on ? 'Turn sound off' : 'Turn sound on');
  document.dispatchEvent(new CustomEvent('dtc-sound', { detail: on }));
});

// ------------------------------------------------------------------ renderer
const canvas = $('#gl');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: !MOBILE && Q.get('bloom') === '0', powerPreference: 'high-performance' });      // with bloom on, the room is drawn into the composer's own image, so multisampling the page canvas only cost time      // phones have dense screens; multisampling there only costs frames
  if (!renderer.getContext()) throw 0;
} catch (e) { renderer = null; }
if (!renderer || Q.get('view') === 'plain') { plainMode(true); $('#plain-x').hidden = !renderer; }

const scene = new THREE.Scene(); scene.background = new THREE.Color(0x0c0b10);
const cam = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, .05, 4000);
const DPR_CAP = MOBILE ? 1.5 : 2, PIX_MAX = MOBILE ? 3.2e6 : 5.0e6;      // most pixels drawn per frame: a large Retina window otherwise asks for 6-7 million and runs in the 50s
const dprTop = () => Math.min(devicePixelRatio || 1, DPR_CAP, Math.sqrt(PIX_MAX / (innerWidth * innerHeight)));
let dpr = dprTop(), dprCeil = Infinity;
const DPR_LOCK = Q.has('dpr'); if (DPR_LOCK) dpr = parseFloat(Q.get('dpr')) || 1;
const U = { time: { value: 0 } };
const state = { mode: 'room', id: null, ready: false, rail: false, paused: false, intro: false };
const qn = (k, d) => Q.has(k) ? parseFloat(Q.get(k)) : d;
const GRADE = { uSat: { value: qn('sat', 1.1) }, uGain: { value: qn('gain', 1.04) } };      // a light grade over the baked light
// room lighting the visitor controls: the baked light is split into "interior" and "city through the window" at draw time
const LIGHT = { uDim: { value: 1 }, uAmt: { value: 0 }, uTint: { value: new THREE.Color(1, 1, 1) }, uCityGain: { value: 1 }, uPrac: { value: 1 }, uFace: { value: 1 }, uRaw: { value: new THREE.Color(1, 1, 1) }, uHotC: { value: new THREE.Vector3() }, uHotR: { value: new THREE.Vector3(1, 1, 1) }, uHotA: { value: 0 } };
const lights = { dim: 1, amt: 0, tint: new THREE.Color(1, 1, 1), raw: new THREE.Color(1, 1, 1), name: 'warm' }, bakeMats = [], glassL = [];
let D = null, PANO = null, os = null;
const live = {}; const hot = []; const pins = []; let composer = null, bloomPass = null, bloomOn = !MOBILE && Q.get('bloom') !== '0';

function size() {
  if (!renderer) return;
  if (!DPR_LOCK) dpr = Math.min(dpr, dprTop());
  renderer.setPixelRatio(dpr); renderer.setSize(innerWidth, innerHeight, false);
  if (composer) { composer.setPixelRatio(dpr); composer.setSize(innerWidth, innerHeight); }
  cam.aspect = innerWidth / innerHeight; layout(); cam.updateProjectionMatrix();
  if (state.ready && !state.paused && !html.classList.contains('plain')) draw();      // a resize clears the canvas: draw again at once, or that blank frame shows as a black flicker
}
function draw() { if (composer && bloomOn) composer.render(); else renderer.render(scene, cam); }

// ------------------------------------------------------------------ helpers: canvases and textures
function mkCanvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function canvasTex(c) { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.flipY = false; t.anisotropy = 4; return t; }
function cover(ctx, im, W, H) {
  const s = Math.max(W / im.width, H / im.height), w = im.width * s, h = im.height * s;
  ctx.drawImage(im, (W - w) / 2, (H - h) / 2, w, h);
}
const loadImg = src => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });
function radial(stops, s = 128) {
  const c = mkCanvas(s, s), x = c.getContext('2d'), g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  stops.forEach(([p, col]) => g.addColorStop(p, col)); x.fillStyle = g; x.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

// ------------------------------------------------------------------ build
const mgr = new THREE.LoadingManager();
mgr.onProgress = (u, n, tot) => { $('#ld-fill').style.width = Math.round(n / tot * 100) + '%'; };
const texL = new THREE.TextureLoader(mgr);
const TEXC = MOBILE ? { shell: 1024, case: 1024, mill: 1024, desk: 1024, shelf: 1024, pc: 1024, plants: 1024, ceil: 512 } : { shell: 1024, case: 2048, mill: 2048, desk: 2048, shelf: 2048, pc: 1024, plants: 1024, ceil: 512 };
const TEX = MOBILE ? { shell: 1024, case: 2048, mill: 2048, desk: 2048, shelf: 2048, pc: 1024, plants: 2048, ceil: 1024 } : { shell: 2048, case: 4096, mill: 4096, desk: 4096, shelf: 4096, pc: 2048, plants: 4096, ceil: 1024 };
const loadTex = (url, flip = false) => new Promise((res, rej) => texL.load(url, t => { t.colorSpace = THREE.SRGBColorSpace; t.flipY = flip; t.anisotropy = 8; res(t); }, undefined, rej));

async function build() {
  D = await fetch(R + 'scene_data.json' + VER).then(r => r.json()); PANO = D.sky;
  const maxTex = renderer.capabilities.maxTextureSize;
  const panoW = (MOBILE || maxTex < 4096) ? 1920 : 3840;
  const groups = Object.keys(TEX);
  const gl = new GLTFLoader(mgr), dr = new DRACOLoader(mgr); dr.setDecoderPath('assets/vendor/draco/'); gl.setDRACOLoader(dr);
  const blackTex = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1); blackTex.needsUpdate = true;
  const [room, liv, env, pano, ...bakes] = await Promise.all([
    gl.loadAsync(R + 'room.glb' + VER), gl.loadAsync(R + 'live.glb' + VER), loadTex(R + 'env.jpg' + VER, true), loadTex(R + 'sky_' + panoW + '.webp' + VER, true),
    ...groups.map(g => loadTex(R + 'bake_' + g + '_' + TEX[g] + '.webp' + VER)),
  ]);
  $('#ld-text').textContent = 'Lighting the candles';
  // baked meshes
  room.scene.traverse(o => {
    if (!o.isMesh) return;
    const g = o.name.replace('BAKE_', ''), i = groups.indexOf(g);
    const m = new THREE.MeshBasicMaterial({ map: bakes[i], toneMapped: false });
    const plant = g === 'plants';
    if (plant) { m.side = THREE.DoubleSide; addSway(o.geometry); }
    m.userData.u = { uCityMap: { value: blackTex }, uHasCity: { value: 0 }, uPracMap: { value: blackTex }, uHasPrac: { value: 0 } }; m.userData.g = g; bakeMats.push(m);
    m.onBeforeCompile = s => {
      Object.assign(s.uniforms, GRADE, LIGHT, m.userData.u);
      s.fragmentShader = 'varying vec3 vWp; uniform vec3 uHotC, uHotR; uniform float uHotA; uniform float uSat, uGain, uDim, uAmt, uCityGain, uHasCity, uHasPrac, uPrac, uFace; uniform vec3 uTint, uRaw; uniform sampler2D uCityMap, uPracMap;\n' + s.fragmentShader.replace('#include <map_fragment>',
        `#include <map_fragment>
         // three layers: light from the city, light from the desk's own lamps, and everything else. The slider dims the last; the lamps stay on.
         vec3 fullL = diffuseColor.rgb, cityL = texture2D(uCityMap, vMapUv).rgb * uHasCity, pracL = texture2D(uPracMap, vMapUv).rgb * uHasPrac;
         vec3 inL = max(fullL - cityL - pracL, 0.), fit = min(fullL / max(inL + cityL + pracL, vec3(1e-4)), vec3(1.));
         float inY = dot(inL, vec3(.2126,.7152,.0722)); inL = mix(inL, uTint * inY, uAmt) * uDim;
         float pY = dot(pracL, vec3(.2126,.7152,.0722)), face = smoothstep(.18, .7, pY);                     // face: the glowing front of a lamp itself, as against the light it throws
         vec3 pT = mix(pracL, mix(uTint, uRaw * 1.15, face) * pY, uAmt) * mix(uPrac, uFace, face);            // lamps take the chosen colour, ease with the slider, and go dark at Off
         diffuseColor.rgb = (inL + pT + cityL * uCityGain * mix(1., .22, face * (1. - uFace))) * fit;      // a lamp that is off should look off: its white face does not get to glow with city light
         float lumG=dot(diffuseColor.rgb,vec3(.2126,.7152,.0722)); diffuseColor.rgb=max(mix(vec3(lumG),diffuseColor.rgb,uSat),0.)*uGain;
         // the thing being pointed at sits in its own pool of light
         vec3 hq = (vWp - uHotC) / uHotR; float hm = uHotA * (1. - smoothstep(.5, 1.2, length(hq)));
         diffuseColor.rgb = diffuseColor.rgb * (1. + hm * 1.3) + vec3(1., .88, .66) * hm * .09;`);
      s.vertexShader = 'varying vec3 vWp;\n' + s.vertexShader.replace('#include <project_vertex>', 'vWp = (modelMatrix * vec4(transformed, 1.0)).xyz;\n#include <project_vertex>');
      if (!plant) return;
      s.uniforms.uTime = U.time;
      s.vertexShader = 'attribute float sway;\nuniform float uTime;\n' + s.vertexShader.replace('#include <begin_vertex>',
        '#include <begin_vertex>\n transformed.x += sin(uTime*1.25 + position.y*2.1 + position.z*1.7)*0.014*sway;\n transformed.z += cos(uTime*1.05 + position.x*1.9 + position.y)*0.010*sway;\n transformed.y += sin(uTime*0.9 + position.x*2.3)*0.006*sway;');
    };
    m.customProgramCacheKey = () => plant ? 'bake-plant' : 'bake';
    o.material = m; o.matrixAutoUpdate = false; o.updateMatrix(); live[o.name] = o;
  });
  scene.add(room.scene);
  bakes.forEach(t => renderer.initTexture(t));
  // backdrop
  scene.add(makePano(pano));
  // live parts
  env.wrapS = THREE.RepeatWrapping;
  liv.scene.traverse(o => { if (o.isMesh) live[o.name] = o; });
  scene.add(liv.scene);
  const glass = (name, strength, base, pow, tint) => { const o = live[name]; if (o) { o.material = glassMat(env, strength, base, pow, tint); o.renderOrder = 5; if (name !== 'GLASS_WIN') { o.userData.s = strength; glassL.push(o); } } };
  for (const [n, c] of [['SIGN_W', 0xfff6ea], ['SIGN_WORK', 0xfff3e6], ['SIGN_T', 0x2ffff0], ['SIGN_RULE', 0x2ffff0]]) if (live[n]) { live[n].material = new THREE.MeshBasicMaterial({ color: c, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }); live[n].renderOrder = 2; }
  glass('GLASS_WIN', .5, .03, 4, [0, 0, 0]); glass('GLASS_JAR', 1.3, .1, 2.5, [.01, .012, .014]);
  glass('GLASS_PC', .7, .05, 3, [0, .012, .012]); glass('GLASS_CANDLE', 1.0, .08, 2.5, [.02, .012, .004]);
  if (bloomOn) try {
    const [ec, rp, ub, op] = await Promise.all([import('three/addons/postprocessing/EffectComposer.js'), import('three/addons/postprocessing/RenderPass.js'), import('three/addons/postprocessing/UnrealBloomPass.js'), import('three/addons/postprocessing/OutputPass.js')]);
    composer = new ec.EffectComposer(renderer); composer.addPass(new rp.RenderPass(scene, cam));
    bloomPass = new ub.UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), qn('bs', .22), qn('br', .5), qn('bt', .88));
    const hp = bloomPass.materialHighPassFilter;      // a NaN pixel (from any shader) gets blurred by the bloom into a black patch that flickers as the camera moves: drop such pixels before the blur
    hp.fragmentShader = hp.fragmentShader.replace('vec4 texel = texture2D( tDiffuse, vUv );', 'vec4 texel = texture2D( tDiffuse, vUv ); if ( any( isnan( texel ) ) || any( isinf( texel ) ) ) texel = vec4( 0.0 );'); hp.needsUpdate = true;
    composer.addPass(bloomPass); composer.addPass(new op.OutputPass());
  } catch (e) { composer = null; }
  await document.fonts.ready; await Promise.all([document.fonts.load('800 40px Montserrat'), document.fonts.load('500 20px Inter')]).catch(() => { });
  await screens();
  glows(); flames(); steam(); dust(); fans(); plaques(); hotspots(); questDraw(); $('#quest').hidden = false;
  state.ready = true;
  // the city-light layer arrives after the room is up; until then the dimmer simply dims everything
  const cl = new THREE.TextureLoader();
  Promise.all(bakeMats.map(m => new Promise(res => cl.load(R + 'bake_' + m.userData.g + '_city_' + TEXC[m.userData.g] + '.webp' + VER, t => { t.colorSpace = THREE.SRGBColorSpace; t.flipY = false; t.generateMipmaps = false; t.minFilter = THREE.LinearFilter; res(t); }, undefined, () => res(null)))))
    .then(ts => { if (ts.every(Boolean)) ts.forEach((t, i) => { renderer.initTexture(t); bakeMats[i].userData.u.uCityMap.value = t; bakeMats[i].userData.u.uHasCity.value = 1; }); })
    .then(() => Promise.all(bakeMats.map(m => new Promise(res => cl.load(R + 'bake_' + m.userData.g + '_prac_' + TEXC[m.userData.g] + '.webp' + VER, t => { t.colorSpace = THREE.SRGBColorSpace; t.flipY = false; t.generateMipmaps = false; t.minFilter = THREE.LinearFilter; res(t); }, undefined, () => res(null))))))
    .then(ts => { if (ts.every(Boolean) && !Q.has('noprac')) ts.forEach((t, i) => { renderer.initTexture(t); bakeMats[i].userData.u.uPracMap.value = t; bakeMats[i].userData.u.uHasPrac.value = 1; }); });
}

function addSway(geo) {
  const p = geo.attributes.position, n = p.count, a = new Float32Array(n), bases = D.plants.map(b => ({ p: v3(b.p), amp: b.amp }));
  const v = new V3();
  for (let i = 0; i < n; i++) {
    v.fromBufferAttribute(p, i); let best = 1e9, amp = 1;
    for (const b of bases) { const d = v.distanceTo(b.p); if (d < best) { best = d; amp = b.amp; } }
    a[i] = clamp(best / .9, 0, 1.6) * amp;
  }
  geo.setAttribute('sway', new THREE.BufferAttribute(a, 1));
}

// fireworks: now and then a short volley goes up over the bay, and the room catches the flash
const FW = { u: [new THREE.Vector4(0, 0, -99, 0), new THREE.Vector4(0, 0, -99, 0), new THREE.Vector4(0, 0, -99, 0)], k: 0, next: 0, left: 0, flash: 0 };
function fwTick(t, dt) {
  FW.flash = Math.max(0, FW.flash - dt * 1.6);
  if (!FW.next) FW.next = t + qn('fw', 38);
  if (t < FW.next || state.intro || document.hidden) return;
  if (FW.left <= 0) FW.left = 4 + Math.floor(Math.random() * 3);
  FW.u[FW.k++ % 3].set(.3 + Math.random() * .5, .8 + Math.random() * .13, t, Math.random()); FW.flash = 1; FW.left--;
  setTimeout(() => audio.blip(58 + Math.random() * 20, .7, .05, 'sine'), 900 + Math.random() * 500);          // the sound arrives late, from across the water
  FW.next = t + (FW.left > 0 ? .55 + Math.random() * .7 : 85 + Math.random() * 60);
}
function makePano(tex) {
  // generated dusk skyline on a cylinder section; mirrored sideways so it wraps the corner window
  const { lon0, lon1, lat0, lat1, eye, vh } = PANO, rad = Math.PI / 180, NX = 96, NY = 32, Rr = 1500, A = -80, B = 140, C = -32, E = 46;
  tex.wrapS = THREE.MirroredRepeatWrapping; tex.wrapT = THREE.ClampToEdgeWrapping; tex.anisotropy = 4; tex.needsUpdate = true;
  const pos = [], uv = [], idx = [];
  for (let j = 0; j <= NY; j++) for (let i = 0; i <= NX; i++) {
    const lo = A + (B - A) * i / NX, la = C + (E - C) * j / NY, lon = lo * rad, lat = la * rad;
    pos.push(Math.sin(lon) * Math.cos(lat) * Rr, Math.sin(lat) * Rr, -Math.cos(lon) * Math.cos(lat) * Rr); uv.push((lo - lon0) / (lon1 - lon0), (la - lat0) / (lat1 - lat0));
  }
  for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) { const a = j * (NX + 1) + i, b = a + 1, c = a + NX + 1, d = c + 1; idx.push(a, c, b, b, c, d); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx);
  const m = new THREE.ShaderMaterial({
    uniforms: { map: { value: tex }, uTime: U.time, vh: { value: vh }, uFw: { value: FW.u } }, side: THREE.DoubleSide, depthWrite: false, toneMapped: false,
    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: `uniform sampler2D map; uniform float uTime, vh; uniform vec4 uFw[3]; varying vec2 vUv;
      float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
      float lum(vec3 c){ return dot(c,vec3(.299,.587,.114)); }
      vec3 hueRot(vec3 c,float a){ const vec3 k=vec3(.57735); float ca=cos(a), sa=sin(a); return c*ca+cross(k,c)*sa+k*dot(k,c)*(1.-ca); }
      void main(){ vec2 uv=vUv; float d=max(0.,vh-uv.y), w=smoothstep(.0,.03,d);              // water below the horizon
        uv.x += w*(sin(uv.y*170.+uTime*1.5)+.6*sin(uv.y*97.-uTime*1.1+uv.x*30.))*.001*(.4+d*3.);
        uv.y += w*sin(uv.x*90.+uTime*.9+uv.y*40.)*.0022;
        vec3 c=texture2D(map,vec2(uv.x,clamp(uv.y,.004,.996))).rgb;
        c += w*.1*vec3(1.,.7,.9)*pow(max(0.,sin(uv.x*420.+uv.y*900.+uTime*2.6)),6.)*smoothstep(.0,.12,d);
        vec2 um=vec2(abs(mod(vUv.x+1.,2.)-1.), vUv.y);                                         // position in the picture (it is mirrored sideways past its edges)
        if (vUv.y>vh+.004 && vUv.y<.93) {                                                       // the city is awake: windows go on and off, light strips drift in colour
          vec3 b=(texture2D(map,uv+vec2(.004,0.)).rgb+texture2D(map,uv-vec2(.004,0.)).rgb+texture2D(map,uv+vec2(0.,.008)).rgb+texture2D(map,uv-vec2(0.,.008)).rgb)*.25;
          float hi=smoothstep(.03,.15,lum(c)-lum(b));                                           // a lit window stands out from what is around it; sky does not
          vec2 cell=floor(um*vec2(640.,270.)); float h=hash(cell), ph=uTime*.16+h*11., r=hash(cell+floor(ph)*1.7), e=smoothstep(0.,.18,fract(ph))*smoothstep(1.,.82,fract(ph));
          c*=1.+hi*e*(r>.84?-.62:(r<.12?.85:0.));
          float mx=max(c.r,max(c.g,c.b)), mn=min(c.r,min(c.g,c.b)), sat=(mx-mn)/max(mx,.001);
          c=mix(c, max(hueRot(c, sin(uTime*.2+floor(um.x*46.)*2.1)*1.1), 0.), hi*smoothstep(.4,.7,sat)*smoothstep(.45,.8,mx));
        }
        if (um.x<.226) {                                                                        // traffic on the causeway
          float yb=mix(.4175,.3925,um.x/.226), dy=vUv.y-yb, fade=smoothstep(.226,.2,um.x);
          float a1=um.x*46.-uTime*.16, a2=um.x*38.+uTime*.13+.37;
          float c1=smoothstep(.16,0.,abs(fract(a1)-.5))*step(.42,hash(vec2(floor(a1),3.)))*smoothstep(.0016,.0003,abs(dy-.0012));
          float c2=smoothstep(.16,0.,abs(fract(a2)-.5))*step(.42,hash(vec2(floor(a2),7.)))*smoothstep(.0016,.0003,abs(dy+.0006));
          c+=fade*(vec3(1.,.93,.78)*c1*.9+vec3(1.,.16,.1)*c2*.8);
        }
        { vec2 q=(um-vec2(.5285,.851))*vec2(2.33,1.); c+=vec3(1.,.12,.08)*smoothstep(.0042,0.,length(q))*pow(max(0.,sin(uTime*2.1)),10.)*1.6;      // aircraft warning lights on the tall towers
          q=(um-vec2(.1775,.664))*vec2(2.33,1.); c+=vec3(1.,.12,.08)*smoothstep(.0036,0.,length(q))*pow(max(0.,sin(uTime*2.1+2.)),10.)*1.4;
          q=(um-vec2(.9045,.667))*vec2(2.33,1.); c+=vec3(1.,.12,.08)*smoothstep(.0036,0.,length(q))*pow(max(0.,sin(uTime*2.1+4.)),10.)*1.4;
          float tp=fract(uTime/64.); vec2 pp=vec2(mix(1.25,-.25,tp), mix(.80,.955,tp)); q=(vUv-pp)*vec2(2.33,1.);                                  // a plane climbing out across the sky
          c+=(vec3(1.,.96,.9)*smoothstep(.0026,0.,length(q))*.75+vec3(1.,.2,.15)*smoothstep(.004,0.,length(q+vec2(.004,0.)))*step(.86,fract(uTime*.9)))*smoothstep(.0,.04,tp)*smoothstep(1.,.96,tp); }
        { float bt=fract(uTime/110.), bx=mix(-.12,1.12,bt), by=vh-.034; vec2 q=(vUv-vec2(bx,by))*vec2(2.33,1.);                      // a yacht crossing the bay, with its lights on the water
          float hull=smoothstep(.0016,.0008,abs(q.y+.0006))*smoothstep(.0105,.008,abs(q.x)), cabin=smoothstep(.0014,.0006,abs(q.y-.0022))*smoothstep(.0056,.004,abs(q.x+.001));
          c=mix(c, vec3(.03,.02,.06), max(hull,cabin)*.85);
          float lts=smoothstep(.0011,0.,length(q-vec2(.0085,.0012)))+smoothstep(.0011,0.,length(q-vec2(-.0085,.0012)))+smoothstep(.0009,0.,length(q-vec2(.0,.0042)))+cabin*.55*step(.5,fract(q.x*420.));
          c+=vec3(1.,.86,.6)*lts*1.2 + vec3(1.,.8,.55)*smoothstep(.012,0.,abs(q.x))*smoothstep(.03,0.,-q.y)*step(q.y,-.001)*.16*(.6+.4*sin(vUv.y*900.+uTime*3.)); }
        for (int i=0;i<3;i++) { float ft=uTime-uFw[i].z; if (ft>0. && ft<2.8) {                                                    // fireworks over the bay, mirrored faintly in the water
          float yy=vUv.y<vh ? 2.*vh-vUv.y : vUv.y, refl=vUv.y<vh ? .28 : 1.; vec2 q=(vec2(vUv.x,yy)-uFw[i].xy)*vec2(2.33,1.); q.y+=ft*ft*.0035;
          float R=.115*(1.-exp(-ft*2.6)), rad=length(q), ang=atan(q.y,q.x), fade=smoothstep(2.8,.8,ft);
          float rays=pow(max(0.,cos(ang*9.+uFw[i].w*20.)),10.)+.6*pow(max(0.,cos(ang*15.+uFw[i].w*7.)),14.);
          float sp=rays*(smoothstep(.014,0.,abs(rad-R))*1.5+smoothstep(R,R*.3,rad)*smoothstep(0.,R*.8,rad)*.3)*(.7+.3*sin(uTime*40.+ang*30.))+smoothstep(.02,0.,rad)*smoothstep(.3,0.,ft)*2.;
          c+=(.14+1.25*max(vec3(0.),cos(6.2832*(uFw[i].w+vec3(0.,.33,.67)))))*sp*fade*refl*1.8; } }
        c = mix(c, vec3(.045,.02,.11), smoothstep(.02,-.5,vUv.y));                              // deep water under the picture
        c = mix(c, vec3(.11,.05,.3), smoothstep(.98,1.7,vUv.y));                                // sky above it
        gl_FragColor=vec4(c,1.);
        #include <colorspace_fragment>
      }`,
  });
  const mesh = new THREE.Mesh(g, m); mesh.position.set(eye[0], eye[1], eye[2]); mesh.renderOrder = -10; mesh.frustumCulled = false; return mesh;
}

function glassMat(env, strength, base, pow, tint) {
  return new THREE.ShaderMaterial({
    uniforms: { env: { value: env }, uS: { value: strength }, uB: { value: base }, uP: { value: pow }, uT: { value: new V3(...tint) } },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, toneMapped: false,
    vertexShader: 'varying vec3 vN, vW; void main(){ vec4 w=modelMatrix*vec4(position,1.); vW=w.xyz; vN=normalize(mat3(modelMatrix)*normal); gl_Position=projectionMatrix*viewMatrix*w; }',
    fragmentShader: `uniform sampler2D env; uniform float uS,uB,uP; uniform vec3 uT; varying vec3 vN,vW;
      void main(){ vec3 n=normalize(vN), v=normalize(cameraPosition-vW); if(dot(n,v)<0.) n=-n; vec3 r=reflect(-v,n);
        vec2 uv=vec2((abs(r.x)+abs(r.z)<1e-6 ? 0. : atan(r.x,-r.z))/6.2831853+.5, asin(clamp(r.y,-1.,1.))/3.14159265+.5);
        vec3 e=texture2D(env,uv).rgb; float f=uB+(1.-uB)*pow(clamp(1.-dot(n,v),0.,1.),uP);
        gl_FragColor=vec4(e*f*uS+uT,1.);
        #include <colorspace_fragment>
      }`,
  });
}

// ------------------------------------------------------------------ screens
const scr = {};
async function screens() {
  // left monitor: the mini-OS desktop, switched on like a tube
  const c = mkCanvas(1280, 720); drawOSDesktop(c.getContext('2d'), 1280, 720);
  scr.osCanvas = c; scr.osTex = canvasTex(c);
  if (live.SCREEN_L) live.SCREEN_L.material = new THREE.ShaderMaterial({
    uniforms: { map: { value: scr.osTex }, uOn: { value: 0 }, uTime: U.time }, toneMapped: false,
    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: `uniform sampler2D map; uniform float uOn,uTime; varying vec2 vUv;
      void main(){ vec2 uv=vUv; float open=smoothstep(0.,.45,uOn); float y=(uv.y-.5)/max(open,.003)+.5;
        float inside=step(0.,y)*step(y,1.); vec3 col=texture2D(map,vec2(uv.x,y)).rgb*inside;
        col*=.25+.75*smoothstep(.3,1.,uOn);
        float line=exp(-abs(uv.y-.5)*120.)*(1.-open)*step(.01,uOn);
        col+=vec3(.75,.9,1.)*line*2.5 + vec3(.6,.8,1.)*exp(-abs(uv.y-.5)*14.)*(1.-open)*step(.01,uOn)*.35;
        col*=.955+.045*sin(uv.y*720.*3.14159);
        col+=vec3(.012,.014,.022);
        gl_FragColor=vec4(col,1.);
        #include <colorspace_fragment>
      }`,
  });
  // right monitor: an editing timeline with the 2062 cut on it
  const [strip, wave, poster] = await Promise.all([loadImg('media/2062/strip.webp'), loadImg('media/2062/wave.png'), loadImg('media/2062/2062.jpg')]);
  const rc = mkCanvas(1280, 720), rx = rc.getContext('2d'); let wv = null;
  if (wave) { wv = mkCanvas(wave.width, wave.height); const wx = wv.getContext('2d'); wx.drawImage(wave, 0, 0); wx.globalCompositeOperation = 'source-in'; wx.fillStyle = '#39d98a'; wx.fillRect(0, 0, wv.width, wv.height); }
  scr.r = { c: rc, x: rx, strip, wave: wv, poster, tex: canvasTex(rc), last: -1, v: $('#ed-video') };
  if (live.SCREEN_R) live.SCREEN_R.material = new THREE.MeshBasicMaterial({ map: scr.r.tex, toneMapped: false });
  drawEdit(0); scr.r.tex.needsUpdate = true;
  // laptop, phone and arcade
  const fold = await Promise.all(['01-shelf', '02-hot-potato', '03-quiz-show', '05-table-hockey', '07-pinball', '09-party-circuit'].map(n => loadImg('media/fold-party/' + n + '.webp')));
  const reelP = await loadImg('media/reel/reel.jpg');
  const lc = mkCanvas(640, 400), lx = lc.getContext('2d');
  if (reelP) cover(lx, reelP, 640, 400); else { lx.fillStyle = '#231032'; lx.fillRect(0, 0, 640, 400); }
  lx.fillStyle = 'rgba(10,8,14,.35)'; lx.fillRect(0, 0, 640, 400); lx.fillStyle = '#f6efe6'; lx.beginPath(); lx.moveTo(296, 168); lx.lineTo(296, 232); lx.lineTo(352, 200); lx.fill();
  if (live.SCREEN_LAPTOP) live.SCREEN_LAPTOP.material = new THREE.MeshBasicMaterial({ map: canvasTex(lc), toneMapped: false });
  [['SCREEN_PHONE_L', fold[1]], ['SCREEN_PHONE_R', fold[3]]].forEach(([n, im]) => {
    const pc = mkCanvas(276, 608), px = pc.getContext('2d'); px.fillStyle = '#1a0830'; px.fillRect(0, 0, 276, 608); if (im) cover(px, im, 276, 608);
    if (live[n]) live[n].material = new THREE.MeshBasicMaterial({ map: canvasTex(pc), toneMapped: false });
  });
}
// the room's copy of the edit screen: bin, programme monitor, timeline. The same clip plays in the full editor.
const CUTS = [0, 3.3, 5.22, 8.3, 13.38, 15.68, 19.8, 23.88, 26.82, 30.57], DUR = 35.85;
function drawEdit(tt) {
  const r = scr.r, x = r.x, W = 1280, H = 720, v = r.v, live_ = v && v.readyState >= 2 && v.videoWidth, t = live_ ? v.currentTime : tt % DUR;
  x.fillStyle = '#17161d'; x.fillRect(0, 0, W, H);
  x.fillStyle = '#0f0e14'; x.fillRect(0, 0, W, 34);
  x.font = '800 16px Montserrat'; x.fillStyle = '#f6efe6'; x.fillText('DT', 14, 23); x.fillStyle = '#19e6d6'; x.fillText('+', 39, 23); x.fillStyle = '#f6efe6'; x.fillText('C  Edit', 52, 23);
  x.font = '500 14px Inter'; x.fillStyle = '#8f879c'; ['Assembly', 'Edit', 'Color', 'Audio'].forEach((n, i) => { x.fillStyle = i === 1 ? '#19e6d6' : '#8f879c'; x.fillText(n, 520 + i * 92, 23); });
  x.fillStyle = '#8f879c'; x.textAlign = 'right'; x.fillText('2062_MIAMI_FL', W - 14, 23); x.textAlign = 'left';
  // bin
  x.fillStyle = '#1e1d26'; rr(x, 8, 42, 300, 392, 8); x.fill(); x.fillStyle = '#b9afc0'; x.font = '600 13px Inter'; x.fillText('Project: 2062', 20, 64);
  for (let i = 0; i < 6; i++) {
    const bx = 20 + (i % 3) * 94, by = 78 + Math.floor(i / 3) * 176, f = Math.min(35, Math.floor(CUTS[i + (i > 2 ? 3 : 0)] + 1));
    x.fillStyle = '#0c0b10'; x.fillRect(bx, by, 84, 150); if (r.strip) x.drawImage(r.strip, f * 72, 0, 72, 128, bx, by, 84, 150);
    x.fillStyle = '#8f879c'; x.font = '500 11px Inter'; x.fillText('Shot ' + String(i + (i > 2 ? 4 : 1)).padStart(2, '0'), bx, by + 166);
  }
  // programme monitor
  x.fillStyle = '#08070b'; rr(x, 316, 42, 956, 392, 8); x.fill();
  const src = live_ ? v : r.poster;
  if (src) {
    const sw = live_ ? v.videoWidth : src.width, sh = live_ ? v.videoHeight : src.height;
    x.save(); rr(x, 316, 42, 956, 392, 8); x.clip(); x.globalAlpha = .22; const k = 956 / sw; x.drawImage(src, 316, 238 - sh * k / 2, 956, sh * k); x.globalAlpha = 1; x.restore();
    const ph = 372, pw = ph * sw / sh; x.drawImage(src, 794 - pw / 2, 52, pw, ph);
  }
  const fr = Math.floor((t % 1) * 24), tc = '00:00:' + String(Math.floor(t)).padStart(2, '0') + ':' + String(fr).padStart(2, '0');
  x.font = '700 15px "JetBrains Mono"'; x.fillStyle = '#19e6d6'; x.fillText(tc, 330, 424); x.fillStyle = '#f6efe6'; x.beginPath(); x.moveTo(1238, 410); x.lineTo(1238, 426); x.lineTo(1252, 418); x.fill();
  // timeline
  const tx = 96, tw = W - tx - 14, X = s => tx + s / DUR * tw;
  x.fillStyle = '#1e1d26'; rr(x, 8, 442, W - 16, 270, 8); x.fill();
  x.font = '500 11px "JetBrains Mono"'; x.fillStyle = '#6f677c';
  for (let s = 0; s <= 35; s += 5) { x.fillRect(X(s), 452, 1, 10); x.fillText('00:' + String(s).padStart(2, '0'), X(s) + 4, 462); }
  const rows = [['V2', 472, 40], ['V1', 518, 96], ['A1', 620, 76]];
  x.font = '700 12px Inter'; rows.forEach(([n, y, h]) => { x.fillStyle = '#26242f'; x.fillRect(16, y, 72, h); x.fillStyle = '#b9afc0'; x.fillText(n, 28, y + h / 2 + 4); x.fillStyle = '#131219'; x.fillRect(tx, y, tw, h); });
  x.fillStyle = '#b06bff'; rr(x, X(0) + 1, 474, X(3.3) - X(0) - 2, 36, 5); x.fill(); x.fillStyle = '#1b1028'; x.font = '700 12px Inter'; x.fillText('2062 MIAMI, FL', X(0) + 10, 497);
  if (r.strip) x.drawImage(r.strip, tx, 520, tw, 92);
  CUTS.forEach((c, i) => { const x0 = X(c), x1 = X(CUTS[i + 1] || DUR); x.strokeStyle = '#49c2ff'; x.lineWidth = 2; x.strokeRect(x0 + 1, 520, x1 - x0 - 2, 92); x.fillStyle = 'rgba(12,11,16,.7)'; x.fillRect(x0 + 2, 521, 52, 16); x.fillStyle = '#cfe9ff'; x.font = '600 11px Inter'; x.fillText('Shot ' + String(i + 1).padStart(2, '0'), x0 + 6, 533); });
  x.fillStyle = '#12301f'; x.fillRect(tx, 622, tw, 72); if (r.wave) x.drawImage(r.wave, tx, 624, tw, 68);
  const px = X(t); x.fillStyle = '#ff4fb8'; x.fillRect(px - 1, 448, 2, 256); x.beginPath(); x.moveTo(px - 8, 446); x.lineTo(px + 8, 446); x.lineTo(px, 458); x.fill();
}
function drawOSDesktop(x, W, H) {
  const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1b1140'); g.addColorStop(.45, '#7a2a78'); g.addColorStop(.72, '#ff7a59'); g.addColorStop(1, '#ffc27a');
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  x.fillStyle = 'rgba(12,8,24,.9)'; x.beginPath(); x.moveTo(0, H); let px = 0; let s = 7;
  while (px < W) { s = (s * 16807) % 2147483647; const bw = 30 + (s % 50), bh = 60 + (s % 190) * (1 - Math.abs(px - W * .6) / W); x.lineTo(px, H - 110 - bh); x.lineTo(px + bw, H - 110 - bh); px += bw + 6; }
  x.lineTo(W, H); x.fill();
  x.fillStyle = 'rgba(14,10,22,.55)'; x.fillRect(0, 0, W, 34);
  x.fillStyle = '#f6efe6'; x.font = '800 18px Montserrat'; x.fillText('DT', 16, 24); x.fillStyle = '#19e6d6'; x.fillText('+', 45, 24); x.fillStyle = '#f6efe6'; x.fillText('C  OS', 60, 24);
  x.font = '500 15px Inter'; x.textAlign = 'right'; x.fillText('Miami, dusk', W - 16, 23); x.textAlign = 'left';
  const n = 9, bw = 62, gap = 14, tot = n * bw + (n - 1) * gap, x0 = (W - tot) / 2, y0 = H - 92;
  x.fillStyle = 'rgba(14,10,22,.5)'; rr(x, x0 - 18, y0 - 14, tot + 36, bw + 28, 22); x.fill();
  const cols = ['#19e6d6', '#ff4fb8', '#ffb26b', '#8f6bff', '#f6efe6', '#49c2ff', '#ff6b5e', '#b6f36b', '#f6efe6'];
  for (let i = 0; i < n; i++) { x.fillStyle = cols[i]; rr(x, x0 + i * (bw + gap), y0, bw, bw, 16); x.fill(); }
  x.fillStyle = 'rgba(14,10,22,.62)'; rr(x, 90, 90, 470, 290, 16); x.fill();
  x.fillStyle = '#f6efe6'; x.font = '800 44px Montserrat'; x.fillText('Step inside.', 122, 170);
  x.font = '500 20px Inter'; x.fillStyle = '#d9cfe0'; x.fillText('Reel, work, 2062, Fold Party,', 122, 214); x.fillText('a terminal, paint, drums and a game.', 122, 244);
  x.fillStyle = '#19e6d6'; rr(x, 122, 286, 170, 52, 26); x.fill(); x.fillStyle = '#0c0b10'; x.font = '600 19px Inter'; x.fillText('Click the screen', 139, 319);
}
function rr(x, a, b, w, h, r) { x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath(); }
function tickScreens(t) {
  if (live.SCREEN_L) {                               // tube flicker a moment after load
    const p = (t - 2.2) / 1.1; let on = p <= 0 ? 0 : p >= 1 ? 1 : p;
    if (p > 0 && p < 1) on = p * (Math.sin(p * 38) > -.2 ? 1 : .35);
    live.SCREEN_L.material.uniforms.uOn.value = on;
    if (p > 0 && p < .05 && !scr.thunk) { scr.thunk = 1; audio.blip(90, .25, .12, 'triangle'); }
  }
  const r = scr.r; if (r && state.mode !== 'edit') { const k = Math.floor(t * 12); if (k !== r.last) { r.last = k; drawEdit(t); r.tex.needsUpdate = true; } }
}

// ------------------------------------------------------------------ small live things
const sprites = [], flamesL = [], fansL = [], plq = [];
function glows() {
  const tex = radial([[0, 'rgba(255,255,255,.9)'], [.25, 'rgba(255,255,255,.35)'], [.6, 'rgba(255,255,255,.08)'], [1, 'rgba(255,255,255,0)']]);
  for (const g of D.glows) {
    const m = new THREE.SpriteMaterial({ map: tex, color: new THREE.Color(g.c[0], g.c[1], g.c[2]), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: .34, toneMapped: false });
    const s = new THREE.Sprite(m); s.position.copy(v3(g.p)); s.scale.setScalar(g.s); s.userData.base = g.s > 1.1 ? .1 : .3; s.userData.on = !!g.on; s.userData.col = m.color.clone(); s.userData.seed = sprites.length * 1.7; scene.add(s); sprites.push(s);
  }
  if (D.sign) for (const [dy, col, sc, op] of [[0, 0xfff1e0, 1.5, .2], [-.3, 0xfff1e0, .9, .16], [-.17, 0x19e6d6, 1.0, .14]]) {      // the sign's own halo: stays on in the dark
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: col, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: op, toneMapped: false }));
    s.position.copy(v3(D.sign)).add(new V3(0, dy, 0)); s.scale.setScalar(sc); s.userData = { base: op, seed: sprites.length * 1.7, keep: true }; scene.add(s); sprites.push(s);
  }
}
const steamL = [];
function steam() {
  if (!D.steam) return; const tex = radial([[0, 'rgba(255,255,255,.55)'], [.4, 'rgba(255,255,255,.16)'], [1, 'rgba(255,255,255,0)']]);
  for (const st of D.steam) for (let i = 0; i < (MOBILE ? 3 : 5); i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: 0xffe9d2, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0, toneMapped: false }));
    s.userData = { p: v3(st.p), ph: i / 5 + Math.random() * .1, seed: Math.random() * 9 }; scene.add(s); steamL.push(s);
  }
}
function steamTick(t) {
  for (const s of steamL) { const u = s.userData, k = (t * .22 + u.ph) % 1;
    s.position.set(u.p.x + Math.sin(t * .9 + u.seed + k * 4) * .012 * k, u.p.y + k * .15, u.p.z + Math.cos(t * .7 + u.seed) * .008 * k);
    s.scale.setScalar(.022 + k * .06); s.material.opacity = Math.sin(k * Math.PI) * .2 * (.35 + .65 * Math.max(LIGHT.uDim.value, LIGHT.uPrac.value)); }
}
function flames() {
  const c = mkCanvas(64, 128), x = c.getContext('2d'), g = x.createRadialGradient(32, 92, 2, 32, 76, 52);
  g.addColorStop(0, 'rgba(255,255,240,1)'); g.addColorStop(.25, 'rgba(255,214,120,.95)'); g.addColorStop(.6, 'rgba(255,120,30,.45)'); g.addColorStop(1, 'rgba(255,80,0,0)');
  x.fillStyle = g; x.beginPath(); x.moveTo(32, 4); x.bezierCurveTo(58, 60, 56, 112, 32, 122); x.bezierCurveTo(8, 112, 6, 60, 32, 4); x.fill();
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  for (const f of D.flames) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, toneMapped: false }));
    s.center.set(.5, .12); s.position.copy(v3(f.p)); s.userData = { s: f.s, seed: flamesL.length * 2.3, p: v3(f.p) }; scene.add(s); flamesL.push(s);
  }
}
function dust() {
  const N = MOBILE ? 140 : 380, pos = new Float32Array(N * 3), seed = new Float32Array(N * 3);
  const a = v3(D.dust[0].a), b = v3(D.dust[0].b), r0 = D.dust[0].r0, r1 = D.dust[0].r1, ax = b.clone().sub(a);
  const u = new V3(1, 0, 0).cross(ax).normalize(), w = ax.clone().cross(u).normalize();
  let s = 3; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < N; i++) {
    let p;
    if (i < N * .6) { const k = rnd(), rr_ = (r0 + (r1 - r0) * k) * Math.sqrt(rnd()), an = rnd() * 6.283; p = a.clone().addScaledVector(ax, k).addScaledVector(u, Math.cos(an) * rr_).addScaledVector(w, Math.sin(an) * rr_); }
    else p = new V3(-1 + rnd() * 4.6, .6 + rnd() * 2.2, -2.9 + rnd() * 2.6);
    pos.set([p.x, p.y, p.z], i * 3); seed.set([rnd(), rnd(), rnd()], i * 3);
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('seed', new THREE.BufferAttribute(seed, 3));
  const m = new THREE.ShaderMaterial({
    uniforms: { uTime: U.time, uPx: { value: 1 } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false,
    vertexShader: `attribute vec3 seed; uniform float uTime,uPx; varying float vA;
      void main(){ vec3 p=position; p.x+=sin(uTime*.19+seed.x*40.)*.14; p.y+=sin(uTime*.13+seed.y*40.)*.11+sin(uTime*.05+seed.z*9.)*.08; p.z+=cos(uTime*.17+seed.z*40.)*.14;
        vec4 mv=modelViewMatrix*vec4(p,1.); gl_Position=projectionMatrix*mv; gl_PointSize=(1.2+seed.x*2.4)*uPx*(2.4/-mv.z);
        vA=(.35+.65*sin(uTime*(.4+seed.y)+seed.x*30.))*smoothstep(.25,1.2,-mv.z); }`,
    fragmentShader: 'varying float vA; void main(){ float d=length(gl_PointCoord-.5); gl_FragColor=vec4(vec3(1.,.86,.66)*smoothstep(.5,.0,d)*vA*.5,1.); }',
  });
  live.dust = new THREE.Points(g, m); live.dust.frustumCulled = false; scene.add(live.dust);
}
function fans() {
  const mat = new THREE.MeshBasicMaterial({ color: 0x0b3a39, side: THREE.DoubleSide, transparent: true, opacity: .92, toneMapped: false });
  const hub = new THREE.MeshBasicMaterial({ color: 0x19e6d6, toneMapped: false });
  for (const f of D.fans) {
    const pos = [], idx = [], B = 9;
    for (let i = 0; i < B; i++) { const a = i / B * Math.PI * 2, r = f.r, k = pos.length / 3;
      pos.push(Math.cos(a) * r * .22, Math.sin(a) * r * .22, 0, Math.cos(a + .12) * r * .96, Math.sin(a + .12) * r * .96, .004, Math.cos(a + .6) * r * .96, Math.sin(a + .6) * r * .96, -.004, Math.cos(a + .42) * r * .22, Math.sin(a + .42) * r * .22, 0);
      idx.push(k, k + 1, k + 2, k, k + 2, k + 3); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx);
    const grp = new THREE.Group(), m = new THREE.Mesh(g, mat), h = new THREE.Mesh(new THREE.CircleGeometry(f.r * .2, 16), hub);
    grp.add(m, h); grp.position.copy(v3(f.p)); grp.userData = { q: new THREE.Quaternion().setFromUnitVectors(new V3(0, 0, 1), v3(f.axis).normalize()), spd: f.spd };
    scene.add(grp); fansL.push(grp);
  }
}
function plaques() {
  for (const p of D.plaques) {
    const c = mkCanvas(640, Math.round(640 * p.h / p.w)), x = c.getContext('2d'); x.textAlign = 'center'; x.textBaseline = 'middle';
    let fs = c.height * .5; x.font = `800 ${fs}px Montserrat`; while (x.measureText(p.label).width > c.width * .9) { fs -= 2; x.font = `800 ${fs}px Montserrat`; }
    x.fillStyle = 'rgba(255,236,190,.55)'; x.fillText(p.label, c.width / 2, c.height / 2 + 2); x.fillStyle = '#2b1a07'; x.fillText(p.label, c.width / 2, c.height / 2);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(p.w, p.h), new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, toneMapped: false }));
    const pos = v3(p.p), n = v3(p.n); m.position.copy(pos); m.lookAt(pos.clone().add(n)); m.renderOrder = 3; scene.add(m); plq.push(m);
  }
}

// ------------------------------------------------------------------ hotspots and pins
function hotspots() {
  const wrap = $('#pins');
  const add = (id, label, c, s, cls = '') => {
    const center = v3(c), half = new V3(s[0] / 2, s[1] / 2, s[2] / 2), box = new THREE.Box3(center.clone().sub(half), center.clone().add(half));
    const b = document.createElement('button'); b.type = 'button'; b.className = 'pin ' + cls + (coarse && cls === 'os' ? ' show' : ''); b.innerHTML = `<span>${label}</span>`; b.setAttribute('aria-label', label);
    b.addEventListener('click', e => { e.stopPropagation(); pick(id); });
    b.addEventListener('pointerenter', () => audio.blip(1200, .04, .02));
    wrap.appendChild(b); const h = { id, label, box, center, el: b, pin: center.clone().add(new V3(s[0] * .46, s[1] * .46, s[2] * .3)) }; hot.push(h); return h;
  };
  for (const h of D.hotspots) { if (h.id === 'pc') continue; const o = add(h.id, h.label, h.c, h.s); o.data = h; }
  const L = D.screens.L; const o = add('os', 'Enter DT+C OS', L.c, [L.w, L.h, .06], 'os'); o.pin = v3(L.c).add(new V3(0, -L.h / 2 - .035, .02));
  const Rs = D.screens.R; const e = add('edit', 'Play 2062', Rs.c, [Rs.w, Rs.h, .06], 'os'); e.pin = v3(Rs.c).add(new V3(0, -Rs.h / 2 - .035, .02));
  const ct = add('city', 'Miami, Florida', [1.5, 2.6, -9], [5.8, 2.0, .5], 'os'); ct.pin = new V3(.62, 2.02, -3.3);      // the skyline through the glass
  const Lp = D.screens.LAPTOP; const rl = add('reel', "Play director's reel", Lp.c, [Lp.w + .04, Lp.h + .04, .2], 'os'); rl.pin = v3(Lp.c).add(new V3(0, Lp.h / 2 + .03, 0));
}
// ------------------------------------------------------------------ objectives: the things to do here, ticked off as they are done
let nearPin = null;
const QUEST = [['project', 'Open a project on the shelf'], ['reel', "Watch the director's reel"], ['edit', 'Play 2062'], ['os', 'Enter DT+C OS'], ['lights', 'Set the lights'], ['city', 'Look out at Miami']];
const qDone = new Set(); try { JSON.parse(localStorage.getItem('dtc-quest') || '[]').forEach(k => qDone.add(k)); } catch (e) { }
function questDraw() {
  const l = $('#quest-l'); if (!l) return;
  l.innerHTML = QUEST.map(([k, t]) => `<li class="${qDone.has(k) ? 'done' : ''}"><button type="button" data-q="${k}"><i></i><span>${t}</span></button></li>`).join('');
  $('#quest-n').textContent = qDone.size + '/' + QUEST.length; $('#quest').classList.toggle('all', qDone.size === QUEST.length); $('#quest-book').hidden = qDone.size !== QUEST.length;
}
function toast(a, b) { const el = $('#toast'); el.innerHTML = `<b>${a}</b><span>${b}</span>`; el.hidden = false; el.classList.remove('on'); void el.offsetWidth; el.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => { el.classList.remove('on'); }, 3200); }
function quest(k) {
  if (qDone.has(k) || !QUEST.some(q => q[0] === k)) return; qDone.add(k); try { localStorage.setItem('dtc-quest', JSON.stringify([...qDone])); } catch (e) { }
  questDraw(); if (state.rail || matchMedia('(max-width:820px),(max-height:520px)').matches) return;      // phones have no list, so nothing to announce
  audio.blip(880, .09, .05); setTimeout(() => audio.blip(1320, .14, .05), 90);
  const all = qDone.size === QUEST.length; toast(all ? 'Studio explored' : 'Objective complete', all ? 'Ready when you are: book a call' : QUEST.find(q => q[0] === k)[1]);
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-q]'); if (b) { const k = b.dataset.q; if (state.mode !== 'room' || tw) return;
    if (k === 'lights') ltBtn.click(); else if (k === 'project') { look.tyaw = state.rail ? 0 : .22; if (state.rail) trail = RAIL[0] + .6; hot.forEach(h => { if (h.data) { h.el.classList.remove('ping'); void h.el.offsetWidth; h.el.classList.add('ping'); } }); } else pick(k); return; }
  if (e.target.closest('#quest-h')) { const q = $('#quest'), small = matchMedia('(max-width:820px),(max-height:520px)').matches, o = small ? q.classList.toggle('open') : !q.classList.toggle('shut'); $('#quest-h').setAttribute('aria-expanded', o); }
});
function keysDraw() {
  const el = $('#keys'); if (!el) return; const m = state.intro ? 'intro' : state.mode, K = (k, t) => `<span><kbd>${k}</kbd>${t}</span>`;
  const sets = coarse ? { room: K('Swipe', 'Look') + K('Tap', 'Open') + K('Pinch', 'Zoom'), focus: K('Tap outside', 'Close'), reel: K('Tap', 'Play / pause'), city: K('Tap', 'Back'), intro: K('Tap', 'Enter') }
    : { room: K('Drag', 'Look') + K('Click', 'Open') + K('Scroll', 'Zoom') + K('L', 'Lights') + K('M', 'Sound'), focus: K('Esc', 'Back') + K('Click outside', 'Close'), reel: K('Space', 'Play / pause') + K('Esc', 'Back'), city: K('Esc', 'Back to studio'), intro: K('Click', 'Enter the studio') };
  const key = m + (m === 'room' && GUIDE.on ? '-guide' : ''), h = key.endsWith('-guide') ? '' : sets[m] || '';      // while the sign in the room is saying it, the legend waits
  if (el.dataset.m !== key) { el.dataset.m = key; el.innerHTML = h; el.hidden = !h; }
}
function pick(id) { if (state.mode === 'os' || state.mode === 'edit' || state.mode === 'reel' || state.mode === 'city' || state.intro || tw) return; audio.blip(620, .06, .045, 'triangle'); setTimeout(() => audio.blip(930, .09, .035), 55); if (id === 'city') enterCity(); else if (id === 'os') enterOS(); else if (id === 'edit') enterEdit(); else if (id === 'reel') enterReel(); else openCard(id); }

// ------------------------------------------------------------------ camera
const pose = { pos: new V3(), tgt: new V3(), fov: 40 }, base = { pos: new V3(), tgt: new V3(), fov: 40 };
const par = { x: 0, y: 0, tx: 0, ty: 0 }, look = { yaw: 0, pitch: 0, tyaw: 0, tpitch: 0 };
let dolly = 0, tdolly = 0, rail = .2, trail = .2, lastInput = -10, tw = null;
const RAIL = [-2.3, 2.0], RAIL0 = .2;
function layout() {
  if (!D) return;
  const a = cam.aspect, room = D.cams.room;
  state.rail = a < 1.15; html.classList.toggle('rail', state.rail);
  if (!state.rail) {
    const hf = 2 * Math.atan(Math.tan(room.fov * Math.PI / 360) * 16 / 9);
    base.fov = clamp(2 * Math.atan(Math.tan(hf / 2) / a) * 180 / Math.PI, 30, 58);
    base.pos.copy(v3(room.pos)); base.tgt.copy(v3(room.tgt));
  } else { base.fov = 52; base.pos.set(rail, 1.5, 2.2); base.tgt.set(rail, 1.32, -2.4); }
  if (state.mode === 'room' && !tw) { pose.pos.copy(base.pos); pose.tgt.copy(base.tgt); pose.fov = base.fov; }
  if (state.mode === 'focus' && state.id && !tw) { const p = focusPose(state.id); pose.pos.copy(p.pos); pose.tgt.copy(p.tgt); pose.fov = p.fov; }
  if (state.mode === 'focus' && state.id) placeCard();
  if (state.mode === 'os' && !tw) { const p = osPose(); pose.pos.copy(p.pos); pose.tgt.copy(p.tgt); pose.fov = p.fov; }
  if (state.mode === 'reel' && !tw) { const p = reelPose(); pose.pos.copy(p.pos); pose.tgt.copy(p.tgt); pose.fov = p.fov; }
  if (state.mode === 'city' && !tw) { const p = introPose(); pose.pos.copy(p.pos); pose.tgt.copy(p.tgt); pose.fov = p.fov; }
  if (state.mode === 'edit' && !tw) { const p = osPose('R'); pose.pos.copy(p.pos); pose.tgt.copy(p.tgt); pose.fov = p.fov; }
}
const sheet = () => innerWidth <= 820 && !(innerHeight <= 520 && innerWidth > innerHeight);
function focusPose(id) {
  const h = D.hotspots.find(x => x.id === id), c = v3(h.tgt), dir = v3(h.cam).sub(c).normalize(), fov = 32;
  const vf = fov * Math.PI / 180, hf = 2 * Math.atan(Math.tan(vf / 2) * cam.aspect), bottom = sheet();
  const emb = embed(), fw = bottom ? .8 : emb ? .33 : (cam.aspect > 1.2 ? .4 : .74), fh = bottom ? .34 : emb ? .5 : .6;
  const d = Math.max((h.s[0] / 2) / Math.tan(hf / 2) / fw, (h.s[1] / 2) / Math.tan(vf / 2) / fh, .55);
  const pos = c.clone().addScaledVector(dir, d), right = new V3().crossVectors(new V3(0, 1, 0), dir).normalize(), up = new V3(0, 1, 0);
  const off = new V3(), out = { fov };
  if (emb) {                                              // lay the pair out in screen pixels, then turn that into a camera offset
    const ppm = (innerHeight / 2) / (d * Math.tan(vf / 2)), W = clamp(innerWidth * .27, 330, 400), objPx = h.s[0] * .62 * ppm, gap = 26, total = objPx + gap + W, left = (innerWidth - total) / 2;
    const xo = (left + objPx / 2) / innerWidth * 2 - 1; off.addScaledVector(right, -xo * Math.tan(hf / 2) * d).addScaledVector(up, Math.tan(vf / 2) * d * .06);
    out.card = { W, xn: (left + objPx + gap + W / 2) / innerWidth * 2 - 1, d };
  } else if (bottom) off.addScaledVector(up, -Math.tan(vf / 2) * d * .52); else if (cam.aspect > 1.2) off.addScaledVector(right, Math.tan(hf / 2) * d * .4);
  out.pos = pos.add(off); out.tgt = c.clone().add(off); return out;
}
function osPose(key = 'L', k = .96, drop = 0, whole = false) {
  const L = D.screens[key], c = v3(L.c), n = v3(L.n).normalize(), fov = 30, vf = fov * Math.PI / 180, hf = 2 * Math.atan(Math.tan(vf / 2) * cam.aspect);
  const d = (whole ? Math.max : Math.min)((L.h / 2) / Math.tan(vf / 2), (L.w / 2) / Math.tan(hf / 2)) * k; c.y -= drop;
  return { pos: c.clone().addScaledVector(n, Math.max(d, .09)), tgt: c, fov };
}
function fly(to, dur, done) {
  if (FREEZE !== null || reduce) dur = 0;
  if (dur <= 0) { pose.pos.copy(to.pos); pose.tgt.copy(to.tgt); pose.fov = to.fov; tw = null; done && done(); return; }
  tw = { f: { pos: pose.pos.clone(), tgt: pose.tgt.clone(), fov: pose.fov }, to, t: performance.now(), dur: dur * 1000, done };
}
function camTick(dt, t) {
  if (tw) {
    const k = clamp((performance.now() - tw.t) / tw.dur, 0, 1), e = ease(k);
    pose.pos.lerpVectors(tw.f.pos, tw.to.pos, e); pose.tgt.lerpVectors(tw.f.tgt, tw.to.tgt, e); pose.fov = tw.f.fov + (tw.to.fov - tw.f.fov) * e;
    tw.k = k; if (k >= 1) { const d = tw.done; tw = null; d && d(); }
  } else if (state.intro) {
    const ip = introPose(); pose.pos.copy(ip.pos); pose.tgt.copy(ip.tgt); pose.fov = ip.fov;
  } else if (state.mode === 'room') {
    if (state.rail) { rail += (trail - rail) * Math.min(1, dt * 5); base.pos.x = rail; base.tgt.x = rail; }
    pose.pos.copy(base.pos); pose.tgt.copy(base.tgt); pose.fov = base.fov;
  }
  const idle = FREEZE !== null || state.intro || (t - lastInput > 3.5);
  if (idle && !reduce) {                                   // attract: the room is never still
    par.tx = Math.sin(t * .21) * .55; par.ty = Math.sin(t * .16 + 1) * .35;
    if (state.rail && state.mode === 'room' && FREEZE === null) trail = clamp(RAIL0 + Math.sin((t - lastInput - 3.5) * .09) * 1.6 * Math.min(1, (t - lastInput - 3.5) / 6), RAIL[0], RAIL[1]);
  }
  const sm = FREEZE !== null ? 1 : Math.min(1, dt * 3.2);
  par.x += (par.tx - par.x) * sm; par.y += (par.ty - par.y) * sm;
  look.yaw += (look.tyaw - look.yaw) * sm * 1.6; look.pitch += (look.tpitch - look.pitch) * sm * 1.6; dolly += (tdolly - dolly) * sm * 1.4;
  const amt = state.mode === 'room' ? 1 : state.mode === 'focus' ? .22 : 0, k = tw ? (state.mode === 'room' ? ease(tw.k || 0) : 1 - ease(tw.k || 0)) : 1;
  const A = amt * (state.mode === 'room' ? k : 1) * (state.rail ? .5 : 1) * (state.intro ? .35 : 1);
  const fwd = pose.tgt.clone().sub(pose.pos).normalize(), right = new V3().crossVectors(fwd, new V3(0, 1, 0)).normalize(), up = new V3().crossVectors(right, fwd);
  const p = pose.pos.clone().addScaledVector(right, par.x * .34 * A).addScaledVector(up, par.y * .16 * A).addScaledVector(fwd, dolly * A);
  const g = pose.tgt.clone().addScaledVector(right, par.x * .06 * A).addScaledVector(up, par.y * .03 * A);
  cam.position.copy(p); cam.up.set(0, 1, 0); cam.lookAt(g);
  if (A > 0) { cam.rotateOnWorldAxis(new V3(0, 1, 0), look.yaw * A); cam.rotateX(look.pitch * A); }
  if (Math.abs(cam.fov - pose.fov) > .001) { cam.fov = pose.fov; cam.updateProjectionMatrix(); }
}

// ------------------------------------------------------------------ input
const ptr = { down: false, x: 0, y: 0, sx: 0, sy: 0, moved: 0, id: null, pinch: 0 }, touches = new Map();
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
function hitAt(x, y) {
  ndc.set(x / innerWidth * 2 - 1, -(y / innerHeight) * 2 + 1); ray.setFromCamera(ndc, cam);
  let best = null, bd = 1e9; const p = new V3();
  for (const h of hot) if (ray.ray.intersectBox(h.box, p)) { const d = p.distanceTo(cam.position); if (d < bd) { bd = d; best = h; } }
  return best;
}
canvas.addEventListener('pointerdown', e => {
  if (state.intro) { endIntro(); return; }
  touches.set(e.pointerId, { x: e.clientX, y: e.clientY }); lastInput = now(); firstInput();
  if (touches.size === 2) { const [a, b] = [...touches.values()]; ptr.pinch = Math.hypot(a.x - b.x, a.y - b.y); }
  ptr.down = true; ptr.x = ptr.sx = e.clientX; ptr.y = ptr.sy = e.clientY; ptr.moved = 0; canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointermove', e => {
  lastInput = now();
  if (touches.has(e.pointerId)) touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (touches.size === 2 && state.mode === 'room') { const [a, b] = [...touches.values()], d = Math.hypot(a.x - b.x, a.y - b.y); tdolly = clamp(tdolly + (d - ptr.pinch) * .006, -.2, 1.7); ptr.pinch = d; return; }
  if (e.pointerType === 'mouse') { par.tx = clamp((e.clientX / innerWidth) * 2 - 1, -1, 1); par.ty = -clamp((e.clientY / innerHeight) * 2 - 1, -1, 1); }
  if (ptr.down) {
    const dx = e.clientX - ptr.x, dy = e.clientY - ptr.y; ptr.x = e.clientX; ptr.y = e.clientY; ptr.moved += Math.abs(dx) + Math.abs(dy);
    if (state.mode === 'room') {
      if (state.rail) trail = clamp(trail - dx * .0075, RAIL[0], RAIL[1]);
      else look.tyaw = clamp(look.tyaw + dx * .0016, -.3, .3);
      look.tpitch = clamp(look.tpitch + dy * .0012, -.1, .12);
    }
      if (ptr.moved > 30) HOV.looked = true;
  } else if (e.pointerType === 'mouse' && state.mode === 'room') { HOV.mouse = hitAt(e.clientX, e.clientY); HOV.mx = e.clientX; HOV.my = e.clientY; canvas.style.cursor = HOV.mouse ? 'pointer' : 'grab'; }
});
const up = e => {
  touches.delete(e.pointerId); if (!ptr.down) return; ptr.down = false;
  if (ptr.moved < 8) { if (state.mode === 'room') { const h = hitAt(e.clientX, e.clientY); if (h) pick(h.id); } else if (state.mode === 'focus') closeCard(); else if (state.mode === 'reel') reelToggle(); else if (state.mode === 'city') exitCity(); }
};
canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
canvas.addEventListener('pointerleave', () => { HOV.mouse = null; });
// ------------------------------------------------------------------ no markers: whatever is under the pointer (on a phone, nearest the middle of the screen) sits in a pool of light and is named once. Left alone, the light walks the shelf so it is clear things open.
const HOV = { cur: null, a: 0, k: 1, mouse: null, near: null, mx: 0, my: 0, el: null, tour: null, looked: false };
function hovEl() { if (HOV.el) return HOV.el; const b = document.createElement('button'); b.type = 'button'; b.id = 'hov'; b.hidden = true; b.innerHTML = '<b></b><i></i>'; b.addEventListener('click', e => { e.stopPropagation(); if (HOV.cur) pick(HOV.cur.id); }); document.body.appendChild(b); return HOV.el = b; }
function hovTick(dt) {
  const t = now(), touch = state.rail || coarse, room = state.mode === 'room' && !state.intro && !tw;
  if (!HOV.tour) HOV.tour = hot.filter(h => h.data);
  let want = null, k = 1, named = true;
  if (room) {
    if (touch) want = HOV.near;
    else if (HOV.mouse) want = HOV.mouse;
    else if (t - lastInput > 2.2 && HOV.tour.length) { want = HOV.tour[Math.floor(t / 1.25) % HOV.tour.length]; k = .5; named = false; }
  }
  if (want !== HOV.cur) {
    HOV.a = Math.max(0, HOV.a - dt * 7);
    if (HOV.a <= .02) { HOV.cur = want; HOV.k = k; if (want) { const s = want.box.getSize(new V3()); LIGHT.uHotC.value.copy(want.center); LIGHT.uHotR.value.set(Math.max(s.x * .75, .13), Math.max(s.y * .75, .13), Math.max(s.z * .9, .16)); } }
  } else if (want) { HOV.k = k; HOV.a = Math.min(1, HOV.a + dt * 5); } else HOV.a = Math.max(0, HOV.a - dt * 7);
  LIGHT.uHotA.value = HOV.a * HOV.k * (HOV.cur && HOV.cur.data ? 1 : .45);
  const el = hovEl(), show = room && named && !!want && want === HOV.cur && !(touch && GUIDE.on);
  if (show) { el.firstChild.textContent = want.label; el.lastChild.textContent = touch ? 'Tap to open' : 'Click to open'; el.classList.toggle('dock', touch); el.style.transform = touch ? '' : `translate(${Math.min(HOV.mx + 18, innerWidth - 220)}px,${Math.min(HOV.my + 20, innerHeight - 70)}px)`; }
  if (el.hidden === show) el.hidden = !show;
}
canvas.addEventListener('wheel', e => { e.preventDefault(); if (state.intro) { endIntro(); return; } lastInput = now(); firstInput(); if (state.mode === 'room') tdolly = clamp(tdolly - e.deltaY * .0014, -.2, 1.7); }, { passive: false });
addEventListener('keydown', e => {
  if (book.open || caseOpen()) return;
  if (state.intro) { if (!e.metaKey && !e.ctrlKey && e.key !== 'Tab') endIntro(); return; }
  if (state.mode === 'edit') { if (e.key === 'Escape') exitEdit(); return; }
  if (state.mode === 'city') { if (e.key === 'Escape') exitCity(); return; }
  if (state.mode === 'reel') { if (e.key === 'Escape') exitReel(); else if (e.key === ' ') { e.preventDefault(); reelToggle(); } return; }
  if (e.key === 'Escape') { if (state.mode === 'focus') closeCard(); else if (state.mode === 'os') exitOS(); else if (html.classList.contains('plain') && renderer) plainMode(false); return; }
  if (state.mode !== 'room' || e.target.closest('input,textarea,select')) return;
  lastInput = now(); firstInput();
  if (e.key === 'l' || e.key === 'L') ltBtn.click();
  if (e.key === 'm' || e.key === 'M') sndBtn.click();
  if (e.key === 'ArrowLeft') state.rail ? trail = clamp(trail - .5, ...RAIL) : look.tyaw = clamp(look.tyaw + .08, -.3, .3);
  if (e.key === 'ArrowRight') state.rail ? trail = clamp(trail + .5, ...RAIL) : look.tyaw = clamp(look.tyaw - .08, -.3, .3);
  if (e.key === 'ArrowUp' || e.key === '+' || e.key === '=') tdolly = clamp(tdolly + .25, -.2, 1.7);
  if (e.key === 'ArrowDown' || e.key === '-') tdolly = clamp(tdolly - .25, -.2, 1.7);
});
let hadInput = false;
function firstInput() { if (hadInput) return; hadInput = true; setTimeout(() => { $('#hint').classList.remove('on'); hideGuide(); }, 1400); }

// ------------------------------------------------------------------ cards
const card = $('#card'), backBtn = $('#back'), STORE = { 'fold-party': 'https://apps.apple.com/app/id6820737260' };
function mediaEl(m, title) {
  const wrap = $('#card-media'); wrap.innerHTML = '';
  const slate = () => { wrap.innerHTML = `<div class="slate">${title}</div>`; };
  if (!m) return slate();
  if (m.type === 'image') { const i = new Image(); i.alt = title + ': ' + m.label; i.onerror = slate; i.src = m.src; wrap.appendChild(i); return; }
  const v = document.createElement('video'); Object.assign(v, { muted: true, loop: true, playsInline: true, autoplay: true, preload: 'metadata', poster: m.poster });
  v.setAttribute('playsinline', ''); v.setAttribute('muted', ''); v.setAttribute('aria-label', title + ': ' + m.label); v.onerror = slate; v.src = m.src; wrap.appendChild(v);
  v.play().catch(() => { });
  if (m.sound) { const b = document.createElement('button'); b.className = 'unmute'; b.type = 'button'; b.textContent = 'Sound on';
    b.onclick = () => { v.muted = !v.muted; b.textContent = v.muted ? 'Sound on' : 'Sound off'; }; wrap.appendChild(b); }
  const pj = byId(state.id);                                 // the clip on the card is a preview: one press takes it to the big player
  if (pj && hasCase(pj.id)) { const w = document.createElement('button'); w.className = 'watch'; w.type = 'button';
    w.innerHTML = `<i></i><span>${pj.watch || (pj.films ? 'Watch the film' : 'Watch full size')}</span>`; w.onclick = () => $('#card-more').click(); wrap.appendChild(w); }
}
function openCard(id) {
  const p = byId(id); if (!p) return;
  if (PROJECTS.some(q => q.id === id)) quest('project');
  state.mode = 'focus'; state.id = id; html.classList.add('focus'); backBtn.hidden = false; $('#hint').classList.remove('on'); hideGuide();
  const st = $('#card-store'); st.hidden = !STORE[id]; if (STORE[id]) st.href = STORE[id];
  $('#card-kind').textContent = p.kind; $('#card-title').textContent = p.title;
  $('#card-body').innerHTML = p.body.map(b => `<p>${b}</p>`).join('');
  const tabs = $('#card-tabs'); tabs.innerHTML = ''; $('#card-media').hidden = !p.media.length;
  if (p.media.length) {
    mediaEl(p.media[0], p.title);
    if (p.media.length > 1) p.media.forEach((m, i) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = m.label; b.setAttribute('aria-pressed', i === 0);
      b.onclick = () => { [...tabs.children].forEach(c => c.setAttribute('aria-pressed', c === b)); mediaEl(m, p.title); }; tabs.appendChild(b); });
  }
  $('#card-more').hidden = !hasCase(id);
  card.hidden = false; card.scrollTop = 0; card.style.animation = 'none'; void card.offsetWidth; card.style.animation = '';
  audio.whoosh(1.0, true); look.tyaw = look.tpitch = 0; tdolly = 0; placeCard(true);
  fly(focusPose(id), 1.5, () => { if (document.activeElement === document.body || document.activeElement.classList.contains('pin')) $('#card-x').focus({ preventScroll: true }); });
}
function closeCard() {
  if (state.mode !== 'focus') return;
  card.hidden = true; tether.style.opacity = 0; cardGlow.material.opacity = 0; $('#card-media').innerHTML = ''; html.classList.remove('focus'); backBtn.hidden = true; state.mode = 'room'; state.id = null;
  audio.whoosh(.9, false); layoutBase(); fly({ pos: base.pos.clone(), tgt: base.tgt.clone(), fov: base.fov }, 1.3);
}
// On wide screens the card belongs to the room: it grows out of the object, is pinned to a point in the scene right beside it,
// and is redrawn there every frame with a perspective tilt. It stays ordinary HTML, so every control on it works.
const tether = document.createElement('div'); tether.className = 'tether'; tether.hidden = true; document.body.appendChild(tether);
const cardGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: radial([[0, 'rgba(255,255,255,.55)'], [.4, 'rgba(255,255,255,.16)'], [1, 'rgba(255,255,255,0)']]), color: 0x19e6d6, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0, toneMapped: false }));
const cardTo = { pos: new V3(), from: new V3(), anchor: new V3(), right: new V3(1, 0, 0), s: 1, W: 380, t0: 0 }, prj = new V3(); let card3d = false;
const embed = () => !sheet() && !state.rail && innerWidth >= 900 && Q.get('card') !== 'flat';
const toScreen = v => { prj.copy(v).project(cam); return [(prj.x + 1) / 2 * innerWidth, (1 - prj.y) / 2 * innerHeight]; };
function placeCard(animate) {
  const want = embed();
  if (want !== card3d) { card3d = want; card.classList.toggle('in3d', want); tether.hidden = !want; if (want) scene.add(cardGlow); else { scene.remove(cardGlow); card.removeAttribute('style'); } }
  if (!want || !state.id) return;
  const p = focusPose(state.id), vf = p.fov * Math.PI / 180, W = p.card.W, h = D.hotspots.find(x => x.id === state.id);
  const fwd = p.tgt.clone().sub(p.pos), d0 = fwd.length(); fwd.normalize();
  const right = new V3().crossVectors(fwd, new V3(0, 1, 0)).normalize(), up = new V3().crossVectors(right, fwd);
  const dc = d0 * .97, hh = dc * Math.tan(vf / 2);
  card.style.width = W + 'px'; card.style.maxHeight = Math.max(360, innerHeight - 96) + 'px';
  cardTo.pos.copy(p.pos).addScaledVector(fwd, dc).addScaledVector(right, p.card.xn * hh * cam.aspect).addScaledVector(up, -.03 * hh);
  cardTo.s = hh / (innerHeight / 2); cardTo.from.copy(v3(h.tgt)); cardTo.anchor.copy(v3(h.tgt)).addScaledVector(right, h.s[0] * .26); cardTo.right.copy(right); cardTo.W = W;
  if (animate) cardTo.t0 = performance.now();
  cardTick();
}
function cardTick() {
  const k = FREEZE !== null || reduce ? 1 : clamp((performance.now() - cardTo.t0 - 650) / 750, 0, 1), e = 1 - Math.pow(1 - k, 3), t = FREEZE !== null ? 0 : performance.now() / 1000;
  const P = new V3().lerpVectors(cardTo.from, cardTo.pos, e); P.y += Math.sin(t * .9) * .003;
  const [x, y] = toScreen(P), dist = Math.max(.05, P.clone().sub(cam.position).dot(cam.getWorldDirection(new V3())));
  const sc = (innerHeight / 2) / (Math.tan(cam.fov * Math.PI / 360) * dist) * cardTo.s * (.25 + .75 * e);
  card.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) translate(-50%,-50%) perspective(1500px) rotateY(${(-11 - par.x * 5 + Math.sin(t * .6) * .7).toFixed(2)}deg) rotateX(${(par.y * 2.5).toFixed(2)}deg) scale(${sc.toFixed(4)})`;
  card.style.opacity = clamp(k * 2.2, 0, 1);
  const [ax, ay] = toScreen(cardTo.anchor), ex = x - cardTo.W / 2 * sc * .98, len = Math.hypot(ex - ax, y - ay);
  tether.style.width = len.toFixed(1) + 'px'; tether.style.transform = `translate(${ax.toFixed(1)}px,${ay.toFixed(1)}px) rotate(${Math.atan2(y - ay, ex - ax).toFixed(4)}rad)`; tether.style.opacity = e * .9;
  cardGlow.position.copy(P).addScaledVector(cardTo.right, -cardTo.W * .25 * cardTo.s); cardGlow.scale.setScalar(cardTo.W * cardTo.s * 2.6); cardGlow.material.opacity = .2 * e * (.5 + .5 * LIGHT.uDim.value);
}
function layoutBase() { const m = state.mode; state.mode = '_'; layout(); state.mode = m; }
$('#card-x').addEventListener('click', closeCard);
const caseOpts = extra => Object.assign({ book: openBook, onOpen: () => { $('#card-media').querySelectorAll('video').forEach(v => v.pause()); state.paused = true; }, onClose: () => { if (state.mode !== 'os' && state.mode !== 'edit' && state.mode !== 'reel') state.paused = false; $('#card-media').querySelectorAll('video').forEach(v => v.play().catch(() => { })); } }, extra || {});
$('#card-more').addEventListener('click', () => { if (state.id) openCase(state.id, caseOpts()); });
backBtn.addEventListener('click', () => { if (state.mode === 'city') exitCity(); else if (state.mode === 'focus') closeCard(); else if (state.mode === 'os') exitOS(); else if (state.mode === 'edit') exitEdit(); });
// ------------------------------------------------------------------ the browser's own Back button steps out of a screen, a card or a project page instead of leaving the studio
const NAV = { hist: 0, mute: 0 };
const navLevel = () => (html.classList.contains('incase') ? 1 : 0) + (['focus', 'os', 'edit', 'reel', 'city'].includes(state.mode) ? 1 : 0);
function navTop() { if (html.classList.contains('incase')) closeCase(); else if (state.mode === 'focus') closeCard(); else if (state.mode === 'os') exitOS(); else if (state.mode === 'edit') exitEdit(); else if (state.mode === 'reel') exitReel(); else if (state.mode === 'city') exitCity(); }
setInterval(() => {
  if (NAV.mute) return; const l = navLevel();
  while (NAV.hist < l) history.pushState({ dtc: ++NAV.hist }, '');
  if (NAV.hist > l) { const n = NAV.hist - l; NAV.hist = l; NAV.mute = 2; history.go(-n); setTimeout(() => { if (NAV.mute === 2) NAV.mute = 0; }, 500); }
}, 120);
addEventListener('popstate', e => {
  if (NAV.mute === 2) { NAV.mute = 0; return; }
  const want = (e.state && e.state.dtc) || 0; let n = navLevel() - want; while (n-- > 0) navTop();
  NAV.hist = want; NAV.mute = 1; setTimeout(() => { if (NAV.mute === 1) NAV.mute = 0; }, 500);
});

// ------------------------------------------------------------------ the computer
const osRoot = $('#os');
async function loadOS() { if (!os) { const m = await import('./os.js'); os = m.mountOS(osRoot, { exit: exitOS, book: openBook, audio, openCase: id => openCase(id, caseOpts({ backLabel: 'Back to DT+C OS' })), sound: () => sndBtn.click(), soundOn: () => audio.on, mobile: () => innerWidth < 760 || coarse }); } return os; }
async function enterOS(app) {
  if (state.mode === 'os') { if (app && os) os.launch(app); return; }
  quest('os');
  if (state.mode === 'focus') { card.hidden = true; tether.style.opacity = 0; cardGlow.material.opacity = 0; html.classList.remove('focus'); }
  state.mode = 'os'; state.id = null; html.classList.add('inos'); backBtn.hidden = true; $('#hint').classList.remove('on');
  look.tyaw = look.tpitch = 0; tdolly = 0; audio.whoosh(1.5, true);
  const ready = loadOS();
  fly(osPose(), 1.9, async () => {
    const o = await ready; osRoot.hidden = false; o.open(app);
    requestAnimationFrame(() => osRoot.classList.add('on'));
    setTimeout(() => { if (state.mode === 'os') state.paused = true; }, 600);
  });
}
function exitOS() {
  if (state.mode !== 'os') return;
  state.paused = false; osRoot.classList.remove('on'); if (os) os.close();
  setTimeout(() => { osRoot.hidden = true; }, 420);
  html.classList.remove('inos'); state.mode = 'room'; audio.whoosh(1.2, false); layoutBase();
  fly({ pos: base.pos.clone(), tgt: base.tgt.clone(), fov: base.fov }, 1.7);
}

// ------------------------------------------------------------------ the edit: 2062 on a timeline
const edRoot = $('#edit'); let ed = null;
async function loadEdit() { if (!ed) { const m = await import('./edit.js'); ed = m.mountEdit(edRoot, { exit: exitEdit, book: openBook, cuts: CUTS, dur: DUR }); } return ed; }
async function enterEdit(autoplay) {
  if (state.mode === 'edit' || state.mode === 'os') return;
  quest('edit');
  if (state.mode === 'focus') { card.hidden = true; tether.style.opacity = 0; cardGlow.material.opacity = 0; html.classList.remove('focus'); }
  state.mode = 'edit'; state.id = null; html.classList.add('inos'); backBtn.hidden = true; $('#hint').classList.remove('on');
  look.tyaw = look.tpitch = 0; tdolly = 0; audio.whoosh(1.5, true);
  const ready = loadEdit();
  fly(osPose('R'), 1.8, async () => {
    const o = await ready; edRoot.hidden = false; o.open(autoplay);
    requestAnimationFrame(() => edRoot.classList.add('on'));
    setTimeout(() => { if (state.mode === 'edit') state.paused = true; }, 600);
  });
}
function exitEdit() {
  if (state.mode !== 'edit') return;
  state.paused = false; edRoot.classList.remove('on'); if (ed) ed.close(!MOBILE);
  setTimeout(() => { edRoot.hidden = true; }, 420);
  html.classList.remove('inos'); state.mode = 'room'; audio.whoosh(1.2, false); layoutBase();
  fly({ pos: base.pos.clone(), tgt: base.tgt.clone(), fov: base.fov }, 1.7);
}

// ------------------------------------------------------------------ the laptop: the director's reel plays on its screen, with the laptop still in view
const reelRoot = $('#reel'), reelV = $('#reel-video'), reel = { tex: null, mat: null, poster: null };
const reelPose = () => osPose('LAPTOP', qn('rk', state.rail ? 1.14 : 1.32), qn('rd', state.rail ? .02 : .026), true);
const fmtT = t => Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0');
function reelScreen(on) {
  const m = live.SCREEN_LAPTOP; if (!m) return;
  if (!on) { if (reel.poster) m.material = reel.poster; return; }
  if (!reel.mat) {
    reel.tex = new THREE.VideoTexture(reelV); reel.tex.colorSpace = THREE.NoColorSpace; reel.tex.flipY = false; reel.poster = m.material;
    reel.mat = new THREE.ShaderMaterial({ uniforms: { map: { value: reel.tex }, k: { value: new THREE.Vector2(1, 1) } }, toneMapped: false,
      vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
      fragmentShader: `uniform sampler2D map; uniform vec2 k; varying vec2 vUv;
        void main(){ vec2 uv=(vUv-.5)/k+.5; vec3 c=(uv.x<0.||uv.x>1.||uv.y<0.||uv.y>1.)?vec3(0.):pow(texture2D(map,uv).rgb,vec3(2.2));
          gl_FragColor=vec4(c,1.);
          #include <colorspace_fragment>
        }` });
  }
  const L = D.screens.LAPTOP, fit = () => { if (!reelV.videoWidth) return; const r = (L.w / L.h) / (reelV.videoWidth / reelV.videoHeight); reel.mat.uniforms.k.value.set(r > 1 ? 1 / r : 1, r > 1 ? 1 : r); };
  fit(); reelV.addEventListener('loadedmetadata', fit, { once: true }); m.material = reel.mat;
}
function reelUI() {
  const p = !reelV.paused; $('#reel-play').setAttribute('aria-label', p ? 'Pause' : 'Play'); $('#reel-play').classList.toggle('on', p);
  $('#reel-mute').setAttribute('aria-pressed', !reelV.muted); $('#reel-mute').setAttribute('aria-label', reelV.muted ? 'Turn sound on' : 'Turn sound off');
}
function reelToggle() { if (reelV.paused) reelV.play().catch(() => { }); else reelV.pause(); }
function enterReel() {
  if (state.mode !== 'room' && state.mode !== 'focus') return;
  if (state.mode === 'focus') { card.hidden = true; tether.style.opacity = 0; cardGlow.material.opacity = 0; html.classList.remove('focus'); }
  quest('reel'); state.mode = 'reel'; state.id = null; html.classList.add('inreel'); backBtn.hidden = true; hideGuide(); look.tyaw = look.tpitch = 0; tdolly = 0; audio.whoosh(1.4, true);
  if (!reelV.getAttribute('src')) { reelV.poster = REEL[0].poster; reelV.src = REEL[0].src; }
  reelV.muted = false; reelV.currentTime = 0; reelV.play().catch(() => { reelV.muted = true; reelV.play().catch(() => { }); });      // started inside the click, so sound is allowed
  reelScreen(true);
  fly(reelPose(), 1.7, () => { reelRoot.hidden = false; requestAnimationFrame(() => reelRoot.classList.add('on')); reelUI(); });
}
function exitReel() {
  if (state.mode !== 'reel') return;
  reelV.pause(); reelScreen(false); reelRoot.classList.remove('on'); setTimeout(() => { reelRoot.hidden = true; }, 400);
  html.classList.remove('inreel'); state.mode = 'room'; audio.whoosh(1.1, false); layoutBase(); fly({ pos: base.pos.clone(), tgt: base.tgt.clone(), fov: base.fov }, 1.6);
}
function reelTick() { if (state.mode !== 'reel' || !reelV.duration) return; const sk = $('#reel-seek'); if (document.activeElement !== sk || reelV.paused === false) sk.value = Math.round(reelV.currentTime / reelV.duration * 1000); $('#reel-time').textContent = fmtT(reelV.currentTime) + ' / ' + fmtT(reelV.duration); }
$('#reel-x').addEventListener('click', exitReel);
$('#reel-book').addEventListener('click', () => { reelV.pause(); openBook(); });
$('#reel-play').addEventListener('click', reelToggle);
$('#reel-mute').addEventListener('click', () => { reelV.muted = !reelV.muted; reelUI(); });
$('#reel-seek').addEventListener('input', e => { if (reelV.duration) reelV.currentTime = e.target.value / 1000 * reelV.duration; });
['play', 'pause', 'volumechange'].forEach(ev => reelV.addEventListener(ev, reelUI));

// ------------------------------------------------------------------ the guide: how to move, projected as a light sign in the room, gone once they have moved
const GUIDE = { mesh: null, on: false, a: 0 };
function guideMesh() {
  const CW = 1792, CH = 400, c = mkCanvas(CW, CH), x = c.getContext('2d'), T = '#19e6d6', verb = coarse ? 'TAP' : 'CLICK';
  x.fillStyle = 'rgba(6,9,13,.62)'; x.fillRect(0, 0, CW, CH);
  x.strokeStyle = T; x.lineWidth = 5; x.lineCap = 'round'; x.lineJoin = 'round'; const k = 46, m = 12;        // corner brackets
  for (const [cx, cy, sx, sy] of [[m, m, 1, 1], [CW - m, m, -1, 1], [m, CH - m, 1, -1], [CW - m, CH - m, -1, -1]]) { x.beginPath(); x.moveTo(cx + sx * k, cy); x.lineTo(cx, cy); x.lineTo(cx, cy + sy * k); x.stroke(); }
  x.textBaseline = 'middle'; x.textAlign = 'left'; x.letterSpacing = '9px';
  const rows = [['DRAG', 'TO LOOK AROUND'], [verb, 'ANYTHING THAT LIGHTS UP']]; let fs = 92;
  do { fs -= 2; x.font = `800 ${fs}px Montserrat`; } while (fs > 40 && Math.max(...rows.map(r => x.measureText(r[0] + ' ' + r[1]).width)) + 150 > CW * .9);
  const row = (y, icon, a, bt) => {
    x.font = `800 ${fs}px Montserrat`; const wa = x.measureText(a + ' ').width, wb = x.measureText(bt).width, W = 150 + wa + wb, x0 = (CW - W) / 2;
    x.save(); x.translate(x0 + 50, y); x.shadowColor = T; x.shadowBlur = 26; x.strokeStyle = T; x.fillStyle = T; x.lineWidth = 7; icon(); x.restore();
    x.shadowColor = T; x.shadowBlur = 30; x.fillStyle = T; x.fillText(a, x0 + 150, y + 4); x.fillStyle = '#f2fffd'; x.fillText(bt, x0 + 150 + wa, y + 4); x.shadowBlur = 0;
  };
  row(128, () => { x.beginPath(); x.moveTo(-52, 0); x.lineTo(52, 0); x.moveTo(-52, 0); x.lineTo(-32, -20); x.moveTo(-52, 0); x.lineTo(-32, 20); x.moveTo(52, 0); x.lineTo(32, -20); x.moveTo(52, 0); x.lineTo(32, 20); x.stroke(); x.beginPath(); x.arc(0, 0, 11, 0, 7); x.fill(); }, ...rows[0]);
  row(278, () => { x.beginPath(); x.moveTo(0, -36); x.lineTo(32, 0); x.lineTo(0, 36); x.lineTo(-32, 0); x.closePath(); x.stroke(); x.beginPath(); x.arc(0, 0, 9, 0, 7); x.fill(); }, ...rows[1]);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.NoColorSpace; tex.anisotropy = 8;
  const mat = new THREE.ShaderMaterial({
    uniforms: { map: { value: tex }, uTime: U.time, uA: { value: 0 } }, transparent: true, depthWrite: false, toneMapped: false, side: THREE.DoubleSide,
    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: `uniform sampler2D map; uniform float uTime, uA; varying vec2 vUv;
      void main(){ vec4 t=texture2D(map,vUv); float open=smoothstep(0.,1.,uA), wipe=step(abs(vUv.x-.5), .5*open+.002);
        float scan=.9+.1*sin(vUv.y*340.-uTime*5.), fl=.94+.06*sin(uTime*23.)*sin(uTime*7.3);
        vec3 c=pow(t.rgb,vec3(2.2))*scan*fl*1.25;
        gl_FragColor=vec4(c, t.a*wipe*uA);
        #include <colorspace_fragment>
      }` });
  const L = D.screens.L, Rs = D.screens.R, n = v3(L.n).add(v3(Rs.n)).setY(0).normalize(), right = new V3().crossVectors(new V3(0, 1, 0), n).normalize();
  let P, W;
  if (state.rail) { const d = cam.getWorldDirection(new V3()).setY(0).normalize(); P = cam.position.clone().addScaledVector(d, 2.3); P.y = cam.position.y - .6; W = .7; n.copy(d).negate(); }
  else { P = v3(L.c).lerp(v3(Rs.c), .5).addScaledVector(n, qn('gz', 1.05)).addScaledVector(right, qn('gx', .06)); P.y = qn('gy', .67); W = qn('gw', .72); n.lerp(base.pos.clone().sub(P).setY(0).normalize(), qn('gf', .6)).normalize(); }
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(W, W * CH / CW), mat); mesh.position.copy(P); mesh.lookAt(P.clone().add(n)); mesh.renderOrder = 6; mesh.userData.keep = true; mesh.userData.follow = state.rail;
  return mesh;
}
function showGuide() {
  if (GUIDE.on || hadInput || state.mode !== 'room') return;
  if (!GUIDE.mesh) { GUIDE.mesh = guideMesh(); scene.add(GUIDE.mesh); }
  GUIDE.on = true; setTimeout(hideGuide, 26000);
}
function hideGuide() { GUIDE.on = false; }
function guideTick(dt) {
  const m = GUIDE.mesh; if (!m) return; const show = GUIDE.on && state.mode === 'room' && !state.intro;
  if (m.userData.follow && show) {                       // on a phone the room slides past, so the sign trails the camera instead of being left behind
    const d = cam.getWorldDirection(new V3()).setY(0).normalize(), to = cam.position.clone().addScaledVector(d, 2.3); to.y = cam.position.y - .6;
    m.position.lerp(to, 1 - Math.exp(-dt * 2.4)); m.lookAt(m.position.clone().sub(d));
  }
  GUIDE.a = clamp(GUIDE.a + (show ? dt * 1.3 : -dt * 2.2), 0, 1); m.material.uniforms.uA.value = GUIDE.a; m.visible = GUIDE.a > 0;
  if (!GUIDE.on && GUIDE.a <= 0) { scene.remove(m); m.geometry.dispose(); m.material.uniforms.map.value.dispose(); m.material.dispose(); GUIDE.mesh = null; }
}

// ------------------------------------------------------------------ the opening: the line is written in lights in the sky over the bay, then the camera steps back into the room
const INTRO = { pos: new V3(1.5, 1.6, -2.0), lon: 8, lat: 16.5, textLat: 22.5, D: 420, t0: 0, out: -1, mesh: null, hold: Q.get('intro') === 'hold' };
const sph = (lon, lat) => new V3(Math.sin(lon * Math.PI / 180) * Math.cos(lat * Math.PI / 180), Math.sin(lat * Math.PI / 180), -Math.cos(lon * Math.PI / 180) * Math.cos(lat * Math.PI / 180));
function introPose() { const wide = cam.aspect >= 1.15; return { pos: INTRO.pos, tgt: INTRO.pos.clone().add(sph(INTRO.lon, wide ? INTRO.lat : 17)), fov: wide ? clamp(base.fov, 34, 46) : 56 }; }
function fitText(x, txt, weight, fam, size, maxW, ls = 0) { x.letterSpacing = ls + 'px'; do { x.font = `${weight} ${size}px ${fam}`; size -= 2; } while (x.measureText(txt).width > maxW && size > 20); return size + 2; }
function skyText(words) {
  const wide = cam.aspect >= 1.15, CW = wide ? 2048 : 1400, CH = wide ? 900 : 1400, c = mkCanvas(CW, CH), x = c.getContext('2d');
  x.fillStyle = '#000'; x.fillRect(0, 0, CW, CH); x.textAlign = 'center'; x.textBaseline = 'alphabetic'; x.globalCompositeOperation = 'lighter';
  const W0 = words || {}, eyebrow = W0.eyebrow || 'DT+C  ·  DAVID TURK CREATIVE  ·  MIAMI';
  const head = W0.head ? (wide ? W0.head : W0.headTall || W0.head) : wide ? ['New creative', 'for your business.'] : ['New creative', 'for your', 'business.'];
  const sub = W0.sub ? W0.sub : wide ? ['Short films  ·  Animation  ·  Commercial production  ·  Website development  ·  App development', 'Visual effects  ·  Storytelling  ·  AI production  ·  Virtual cinematography']
    : ['Short films  ·  Animation', 'Commercial production', 'Website development', 'App development', 'Visual effects  ·  Storytelling', 'AI production  ·  Virtual cinematography'];
  x.fillStyle = '#00ff00'; fitText(x, eyebrow, 600, 'Inter', wide ? 40 : 46, CW * .9, 7); x.fillText(eyebrow, CW / 2, wide ? 90 : 120);
  x.fillStyle = '#ff0000'; let hs = 400; for (const l of head) hs = Math.min(hs, fitText(x, l, 800, 'Montserrat', wide ? 214 : 250, CW * .94, -4));
  x.font = `800 ${hs}px Montserrat`; let y = (wide ? 150 : 200) + hs * .82; for (const l of head) { x.fillText(l, CW / 2, y); y += hs * 1.04; }
  x.fillStyle = '#0000ff'; let ss = 200; for (const l of sub) ss = Math.min(ss, fitText(x, l, 600, 'Inter', wide ? 50 : 62, CW * .92, 1));
  x.font = `600 ${ss}px Inter`; y += ss * .5 - hs * .2; for (const l of sub) { x.fillText(l, CW / 2, y); y += ss * 1.55; }
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.NoColorSpace; tex.minFilter = THREE.LinearFilter; tex.generateMipmaps = false;
  const ip = introPose(), hf = 2 * Math.atan(Math.tan(ip.fov * Math.PI / 360) * cam.aspect), Wm = 2 * INTRO.D * Math.tan(hf / 2) * (wide ? .8 : .84), Hm = Wm * CH / CW;
  const mat = new THREE.ShaderMaterial({
    uniforms: { map: { value: tex }, uTime: U.time, uIn: { value: 0 }, uOut: { value: 0 }, uGrid: { value: new THREE.Vector2(wide ? 250 : 170, (wide ? 250 : 170) * CH / CW) } },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false,
    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: `uniform sampler2D map; uniform float uTime,uIn,uOut; uniform vec2 uGrid; varying vec2 vUv;
      float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
      void main(){ vec2 cell=floor(vUv*uGrid), f=fract(vUv*uGrid)-.5, cuv=(cell+.5)/uGrid; float h=hash(cell);
        vec3 mc=texture2D(map,cuv).rgb, mf=texture2D(map,vUv).rgb;
        float rev=smoothstep(0.,.16,uIn*1.3-cuv.x*.95-h*.14), gone=smoothstep(0.,.5,uOut*1.5-h), tw=.78+.22*sin(uTime*2.6+h*40.);
        float dotI=smoothstep(.47,.1,length(f+vec2(0.,gone*h*.4)))*mc.r*tw*(1.-gone);                 // headline: points of light, like a drone show
        float solid=smoothstep(0.,.3,uIn*1.3-vUv.x*.95-.1)*(1.-smoothstep(0.,1.,uOut*1.6));
        vec3 col=vec3(1.,.95,.88)*(dotI*rev*1.25+mf.r*.22*rev*(1.-gone)) + vec3(1.,.97,.94)*mf.b*solid*.95 + vec3(.3,1.,.92)*mf.g*solid*.9;
        gl_FragColor=vec4(col,1.);
        #include <colorspace_fragment>
      }`,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(Wm, Hm), mat);
  mesh.position.copy(INTRO.pos).addScaledVector(sph(INTRO.lon, wide ? INTRO.textLat : 21.5), INTRO.D); mesh.lookAt(INTRO.pos); mesh.renderOrder = -5; mesh.frustumCulled = false;
  return mesh;
}
// arriving from the homepage's "Enter the studio": no title and no second click. The camera finishes the push-in the homepage started.
function arrive() {
  layoutBase(); lastInput = now();
  if (reduce || FREEZE !== null) { showGuide(); setTimeout(() => lightCue(() => { }), 900); return; }
  const back = base.pos.clone().sub(base.tgt).normalize();
  pose.pos.copy(base.pos).addScaledVector(back, .25); pose.tgt.copy(base.tgt); pose.fov = base.fov + 15;
  showGuide(); fly({ pos: base.pos.clone(), tgt: base.tgt.clone(), fov: base.fov }, 3.2, () => lightCue(() => { }));
}
function startIntro() {
  state.intro = true; html.classList.add('intro'); INTRO.mesh = skyText(); scene.add(INTRO.mesh); INTRO.t0 = performance.now(); INTRO.out = -1;
  const h = $('#hint'); h.dataset.t = h.textContent; h.textContent = coarse ? 'Tap to enter the studio' : 'Click to enter the studio'; setTimeout(() => { if (state.intro) h.classList.add('on'); }, 2600);
  if (!INTRO.hold) setTimeout(endIntro, VIEW === 'tour' ? 5200 : 7500);
}
function endIntro() {
  if (!state.intro) return; state.intro = false; html.classList.remove('intro'); INTRO.out = performance.now(); lastInput = now(); audio.whoosh(1.1, false);
  const h = $('#hint'); h.classList.remove('on'); layoutBase();
  showGuide(); fly({ pos: base.pos.clone(), tgt: base.tgt.clone(), fov: base.fov }, 3.4, () => lightCue(() => { }));
}
// ------------------------------------------------------------------ the city: press the skyline and the camera walks to the glass, and the sky says where the studio is
const CITY = { mesh: null, t0: 0, out: -1 };
function cityDrop() { const m = CITY.mesh; if (!m) return; scene.remove(m); m.geometry.dispose(); m.material.uniforms.map.value.dispose(); m.material.dispose(); CITY.mesh = null; }
function enterCity() {
  if (state.mode !== 'room') return;
  quest('city'); state.mode = 'city'; state.id = null; html.classList.add('incity'); hideGuide(); look.tyaw = look.tpitch = 0; tdolly = 0; audio.whoosh(1.3, true);
  cityDrop(); CITY.mesh = skyText({ eyebrow: 'DT+C  ·  DAVID TURK CREATIVE', head: ['Based out of', 'Miami, Florida'], sub: ['25.76° N   ·   80.19° W'] }); scene.add(CITY.mesh); CITY.t0 = performance.now(); CITY.out = -1;
  backBtn.hidden = false; fly(introPose(), 2.6);
}
function exitCity() {
  if (state.mode !== 'city') return;
  state.mode = 'room'; html.classList.remove('incity'); backBtn.hidden = true; CITY.out = performance.now(); audio.whoosh(1.1, false); layoutBase();
  fly({ pos: base.pos.clone(), tgt: base.tgt.clone(), fov: base.fov }, 2.4);
}
function cityTick() {
  const m = CITY.mesh; if (!m) return; const u = m.material.uniforms, n = performance.now();
  u.uIn.value = FREEZE !== null ? 1 : clamp((n - CITY.t0 - 1100) / 2000, 0, 1);
  if (CITY.out > 0) { u.uOut.value = clamp((n - CITY.out) / 1500, 0, 1); if (u.uOut.value >= 1) cityDrop(); }
}
function introTick() {
  const m = INTRO.mesh; if (!m) return; const u = m.material.uniforms, n = performance.now();
  u.uIn.value = INTRO.hold || FREEZE !== null ? 1 : clamp((n - INTRO.t0 - 500) / 2200, 0, 1);
  if (INTRO.out > 0) { u.uOut.value = clamp((n - INTRO.out) / 1900, 0, 1); if (u.uOut.value >= 1) { scene.remove(m); m.geometry.dispose(); m.material.uniforms.map.value.dispose(); m.material.dispose(); INTRO.mesh = null; } }
}

// ------------------------------------------------------------------ the lights: brightness and colour, with the city left on
const PRAC0 = qn('prac', .34);
const SWATCH = { warm: null, daylight: [1, 1, 1], blue: [.08, .26, 1], red: [1, .04, .06], purple: [.6, .12, 1], teal: [0, .9, .8] };
function setLights(o, save = true) {
  if (o.dim !== undefined) lights.dim = clamp(o.dim, 0, 1);
  if (o.name !== undefined && o.name in SWATCH) { lights.name = o.name; const c = SWATCH[o.name]; lights.amt = c ? (o.name === 'daylight' ? .7 : .92) : 0; if (c) { const y = Math.min(1.9, 1 / Math.max(.4, .2126 * c[0] + .7152 * c[1] + .0722 * c[2])); lights.tint.setRGB(c[0] * y, c[1] * y, c[2] * y); lights.raw.setRGB(c[0], c[1], c[2]); } }
  $('#lt-range').value = Math.round(lights.dim * 100); $('#lt-val').textContent = lights.dim < .02 ? 'Off' : Math.round(lights.dim * 100) + '%';
  document.querySelectorAll('#lt-sw button').forEach(b => b.setAttribute('aria-pressed', b.dataset.c === lights.name));
  html.classList.toggle('dark', lights.dim < .35);
  const LC = { warm: '#ffb26b', daylight: '#f4f6ff', blue: '#5b86ff', red: '#ff4a52', purple: '#b866ff', teal: '#19e6d6' }; ltBtn.style.setProperty('--lamp', lights.dim < .05 ? '#8d8796' : LC[lights.name] || LC.warm);
}
function lightTick(dt) {
  const k = FREEZE !== null ? 1 : Math.min(1, dt * 4.5), L = LIGHT, dimT = .04 + .96 * lights.dim * lights.dim;
  L.uDim.value += (dimT - L.uDim.value) * k; L.uAmt.value += (lights.amt - L.uAmt.value) * k; L.uTint.value.lerp(lights.tint, k);
  L.uCityGain.value += (1 + Math.pow(1 - lights.dim, 1.5) * 2.6 + FW.flash * (.5 + (1 - lights.dim) * 1.4) - L.uCityGain.value) * Math.max(k, FW.flash > .9 ? 1 : 0);
  L.uPrac.value += (clamp(lights.dim * 6, 0, 1) * (PRAC0 + (1 - PRAC0) * lights.dim) - L.uPrac.value) * k;
  L.uFace.value += (clamp(lights.dim * 6, 0, 1) * (.72 + .28 * lights.dim) - L.uFace.value) * k; L.uRaw.value.lerp(lights.raw, k);      // the desk's own lamps ease down far less than the room, and only go out at Off
  for (const s of sprites) if (s.userData.col) s.material.color.copy(s.userData.col).lerp(lights.raw, L.uAmt.value * .8);
  for (const g of glassL) g.material.uniforms.uS.value = g.userData.s * (.3 + .7 * L.uDim.value);
  if (live.dust) live.dust.visible = Math.max(L.uDim.value, L.uPrac.value) > .3;
  for (const m of plq) m.material.color.setScalar(.2 + .8 * L.uDim.value);
}
const ltBtn = $('#lights'), ltPop = $('#lt-pop');
ltBtn.addEventListener('click', () => { const o = ltPop.hidden; ltPop.hidden = !o; ltBtn.setAttribute('aria-expanded', o); if (o) $('#lt-range').focus({ preventScroll: true }); });
$('#lt-range').addEventListener('input', e => { setLights({ dim: e.target.value / 100 }); quest('lights'); });
$('#lt-sw').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { setLights({ name: b.dataset.c }); quest('lights'); } });
addEventListener('pointerdown', e => { if (!ltPop.hidden && !e.target.closest('#lt-pop,#lights')) { ltPop.hidden = true; ltBtn.setAttribute('aria-expanded', false); } }, true);
setLights({}, false);
if (Q.has('dim') || Q.has('light')) setLights({ dim: qn('dim', 1), name: Q.get('light') || 'warm' }, false);
// the opening light cue: the menu opens by itself and the slider pulls the room down to a dim evening, so visitors see the lights are theirs to change
const CUE = { on: false, done: false, t0: 0, from: 1, to: qn('cue', .42), raf: 0 };
function lightCue(then) {
  if (CUE.done || Q.has('dim') || Q.has('light') || FREEZE !== null || VIEW !== 'room') { then && then(); return; }
  CUE.done = true; const end = () => { if (!CUE.on) return; CUE.on = false; cancelAnimationFrame(CUE.raf); ltPop.classList.remove('cue'); removeEventListener('pointerdown', skip, true); };
  const close = () => { if (!ltPop.matches(':hover') && !ltPop.contains(document.activeElement)) { ltPop.hidden = true; ltBtn.setAttribute('aria-expanded', false); } };
  const skip = e => { const inMenu = e.target.closest && e.target.closest('#lt-pop'); if (!CUE.on) return; end(); if (!inMenu) setLights({ dim: CUE.to }, false); then && then(); then = null; };   // any press hands the lights over at once
  if (reduce) { setLights({ dim: CUE.to }, false); then && then(); return; }
  CUE.on = true; CUE.from = lights.dim; ltPop.hidden = false; ltPop.classList.add('cue'); ltBtn.setAttribute('aria-expanded', true); addEventListener('pointerdown', skip, true);
  setTimeout(() => {
    if (!CUE.on) return; CUE.t0 = performance.now();
    const step = () => { if (!CUE.on) return; const k = clamp((performance.now() - CUE.t0) / 2600, 0, 1), e = k * k * (3 - 2 * k); setLights({ dim: CUE.from + (CUE.to - CUE.from) * e }, false);
      if (k < 1) CUE.raf = requestAnimationFrame(step); else setTimeout(() => { if (!CUE.on) return; end(); close(); then && then(); then = null; }, 2200); };
    step();
  }, 900);
}

// ------------------------------------------------------------------ loop
let last = performance.now(), acc = 0, frames = 0, slow = 0, fast = 0, hold = 0; window.__fps = 0;
const projV = new V3(), FAN_Q = new THREE.Quaternion(), FAN_Z = new V3(0, 0, 1);
function frame(tms) {
  requestAnimationFrame(frame);
  if (!state.ready || state.paused || html.classList.contains('plain')) { last = tms; return; }
  const dt = Math.min(.1, (tms - last) / 1000); last = tms; const t = now(); U.time.value = t;
  camTick(dt, t); tickScreens(t); fwTick(t, dt); steamTick(t); introTick(); cityTick(); reelTick(); guideTick(dt);
  lightTick(dt); keysDraw();
  for (const s of sprites) s.material.opacity = s.userData.base * (.9 + .1 * Math.sin(t * 1.3 + s.userData.seed)) * (s.userData.keep ? 1.7 - .7 * LIGHT.uDim.value : .12 + .88 * (s.userData.on ? Math.max(LIGHT.uDim.value, LIGHT.uPrac.value) : LIGHT.uDim.value));
  for (const f of flamesL) { const u = f.userData, k = .9 + .12 * Math.sin(t * 11 + u.seed) + .08 * Math.sin(t * 23.7 + u.seed * 2); f.scale.set(u.s * .62 * (1 + .06 * Math.sin(t * 17 + u.seed)), u.s * 1.5 * k, 1); f.position.x = u.p.x + Math.sin(t * 9 + u.seed) * .0012; }
  for (const f of fansL) f.quaternion.copy(f.userData.q).multiply(FAN_Q.setFromAxisAngle(FAN_Z, t * f.userData.spd));
  if (live.dust) live.dust.material.uniforms.uPx.value = renderer.getPixelRatio() * innerHeight / 900;
  draw();
  if (card3d && state.mode === 'focus') cardTick();
  // pins follow their objects
  const show = state.mode === 'room';
  let near = null, nd = .5;                          // on a phone only the marker nearest the middle of the screen is lit and named; the rest are quiet dots
  for (const h of hot) {
    projV.copy(h.pin).project(cam);
    const ok = show && !state.intro && projV.z < 1 && Math.abs(projV.x) < 1.05 && Math.abs(projV.y) < 1.05;
    h.el.style.opacity = ok ? 1 : 0; h.el.style.pointerEvents = ok ? 'auto' : 'none';
    if (ok) { h.el.style.transform = `translate(${((projV.x + 1) / 2 * innerWidth).toFixed(1)}px,${((1 - projV.y) / 2 * innerHeight).toFixed(1)}px)`;
      const d = Math.hypot(projV.x, (projV.y - .05) * .6); if ((state.rail || coarse) && (h.data || HOV.looked) && d < nd) { nd = d; near = h; } }
  }
  if (near !== nearPin) { if (nearPin) nearPin.el.classList.remove('near'); if (near) near.el.classList.add('near'); nearPin = near; }
  HOV.near = near; hovTick(dt);
  // frame rate watch: lower the internal resolution when frames take too long
  acc += dt; frames++;
  if (acc >= 1) {
    const fps = frames / acc; window.__fps = Math.round(fps); acc = 0; frames = 0;
    const capped = Math.abs(fps - 30) < 3.5 || Math.abs(fps - 40) < 2 || Math.abs(fps - 45) < 2;   // a browser frame cap is not load
    if (fps < 55 && !capped) { slow++; fast = 0; } else if (fps > 58 || capped) { fast++; slow = 0; }
    if (DPR_LOCK || hold > 0) { slow = fast = 0; hold = Math.max(0, hold - 1); }      // the seconds right after a change are not a fair reading
    if (state.mode === 'focus') fast = 0;      // an open card's frosted glass costs frames; raise the resolution again only once it is closed, not back and forth under it
    if (slow >= 2) {                                   // too slow: first a little less resolution (down to 1.25x), then the glow, then resolution again
      slow = 0; hold = 2; const floor = Math.min(dprTop(), 1.25);
      if (dpr > floor + .01) { dprCeil = dpr * .97; dpr = Math.max(floor, dpr * .85); size(); }
      else if (bloomPass && bloomPass.enabled) bloomPass.enabled = false;
      else if (dpr > .8) { dprCeil = dpr * .97; dpr = Math.max(.8, dpr * .85); size(); }
    }
    const top = Math.min(dprTop(), dprCeil);           // never climb back to a resolution that already proved too slow (that see-sawed)
    if (fast >= 6 && dpr < top - .01) { dpr = Math.min(top, dpr * 1.12); fast = 0; hold = 2; size(); }
  }
}

// ------------------------------------------------------------------ tour (?view=tour): hands-free, for a screen recording
const wait = s => new Promise(r => setTimeout(r, s * 1000));
async function tour() {
  lastInput = 1e9; par.tx = .2; par.ty = .1; await wait(9.5); lastInput = 1e9;
  par.tx = -.5; await wait(3);
  openCard('new-era'); await wait(6); closeCard(); await wait(1.8);
  openCard('fold-party'); await wait(6); closeCard(); await wait(1.8);
  enterReel(); await wait(7); exitReel(); await wait(2.4);
  await enterOS('reel'); await wait(11);
  if (os) os.launch('fold'); await wait(5);
  exitOS(); await wait(3.2);
  await enterEdit(true); await wait(12); exitEdit(); await wait(3); lastInput = -10;
}

// ------------------------------------------------------------------ start
async function start() {
  if (!renderer) return;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  try { await build(); } catch (e) { console.error(e); plainMode(true); $('#plain-x').hidden = true; return; }
  size(); addEventListener('resize', size); addEventListener('orientationchange', () => setTimeout(size, 200));
  canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); state.paused = true; });
  canvas.addEventListener('webglcontextrestored', () => { state.paused = false; });
  renderer.compile(scene, cam);
  requestAnimationFrame(frame);
  requestAnimationFrame(() => html.classList.add('ready'));
  if (VIEW === 'room' && Q.has('enter')) arrive(); else if ((VIEW === 'room' || VIEW === 'tour') && !Q.has('nointro')) startIntro(); else if (VIEW === 'room') { showGuide(); setTimeout(() => lightCue(() => { }), 1500); }
  if (state.intro) { const ip = introPose(); pose.pos.copy(ip.pos); pose.tgt.copy(ip.tgt); pose.fov = ip.fov; }
  const v2 = $('#ed-video'); if (v2 && !MOBILE && !reduce && FREEZE === null) { v2.muted = true; v2.loop = true; v2.preload = 'auto'; setTimeout(() => { if (state.mode !== 'edit') v2.play().catch(() => { }); }, 2500); }
  if (VIEW === 'tour') tour();
  else if (VIEW === 'os') enterOS(Q.get('app') || undefined);
  else if (VIEW === 'edit') enterEdit();
  else if (VIEW === 'shelf') { const c = v3(D.shelf.c), n = v3(D.shelf.n); fly({ pos: c.clone().addScaledVector(n, 2.15), tgt: c, fov: 40 }, 0); state.mode = 'view'; }
  else if (VIEW === 'desk') { const c = v3(D.screens.L.c).lerp(v3(D.screens.R.c), .5), n = v3(D.screens.L.n).add(v3(D.screens.R.n)).normalize(); fly({ pos: c.clone().addScaledVector(n, 1.9).add(new V3(0, .45, 0)), tgt: c.clone().add(new V3(0, -.25, 0)), fov: 40 }, 0); state.mode = 'view'; }
  else if (VIEW === 'reel') enterReel();
  else if (VIEW === 'city') enterCity();
  else if (byId(VIEW)) { openCard(VIEW); if (Q.has('case')) openCase(VIEW, caseOpts()); }
  (window.requestIdleCallback || setTimeout)(() => loadOS().catch(() => { }), { timeout: 4000 });
  window.DTC = { state, cam, openCard, closeCard, enterOS, exitOS, enterEdit, exitEdit, enterReel, exitReel, enterCity, exitCity, endIntro, setLights, GRADE, LIGHT, GUIDE, HOV, audio, openBook, get os() { return os; } };
}
start();
