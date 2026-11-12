// Full case studies, shown inside the experience. Text and galleries come from the DT+C site source (assets/cases.json).
import { PROJECTS, FOLD } from './data.js';

const FOLD_CASE = {
  industry: 'Mobile game / DT+C original', timeline: 'Launched October 23, 2026', store: 'https://apps.apple.com/app/id6820737260',
  services: ['Game design', 'iOS development', 'Brand and art direction', 'Sound and host voice', 'Launch site and social content'],
  approach: [
    { title: 'One phone, the whole party', text: 'Pick a game box off a lit video-store shelf, pass the phone around, and a game-show host calls the action while one scoreboard keeps track of the whole party.' },
    { title: 'Every fold is a game', text: 'On iPhone Duo, close the phone and pass it around for Hot Potato, stand it up like a tent for Blind Guess, open it like a laptop for Quiz Show, or lay it flat for Table Hockey. In Safe Cracker the hinge is the dial.' },
    { title: 'Four aisles at launch', text: 'Classics, Game Night, Spy Night and the Rec Room: from Hot Potato and Quiz Show to a 1983 roller-rink pinball table and a heist through a hall of lasers.' },
    { title: 'Party Circuit', text: 'A circuit plays three or four games back to back and crowns a champion, with awards and a picture of the night to share.' },
    { title: 'Plays everywhere', text: 'On every other iPhone and on iPad, the same games play with on-screen controls. No ads, no accounts, no data collected. It plays offline.' },
  ],
  results: ['Sixteen games at launch on four aisles', 'Free to start, with seven free games', 'New packs of four games arrive in app updates', 'Live on the App Store since October 23, 2026'],
  tools: ['Swift', 'Xcode'],
  gallery: [...FOLD.screens.map((s, i) => ({ src: s, alt: 'Fold Party: ' + FOLD.names[i] })), ...['framed-open-arcade', 'framed-open-table-hockey', 'framed-closed-hot-potato'].map(n => ({ src: 'media/fold-party/' + n + '.webp', alt: 'Fold Party on iPhone Duo' }))],
};

let DATA = null, root = null, opts = {}, lastFocus = null, shots = [], shotI = 0;
async function load() {
  if (!DATA) { try { DATA = await fetch('assets/cases.json?v=1').then(r => r.json()); } catch (e) { DATA = {}; } DATA['fold-party'] = FOLD_CASE; }
  return DATA;
}
export const hasCase = id => PROJECTS.some(p => p.id === id);
export const caseOpen = () => !!root && !root.hidden;

function mount() {
  root = document.createElement('div'); root.id = 'case'; root.hidden = true; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true');
  root.innerHTML = `<div class="cs-bar"><button type="button" class="cs-back">Back</button><span class="cs-name"></span><button type="button" class="cta cs-book">Book a call</button></div><div class="cs-scroll"><article class="cs-in"></article></div>
    <div class="cs-lb" hidden><button type="button" class="x cs-lbx" aria-label="Close image">×</button><button type="button" class="cs-nav p" aria-label="Previous image">‹</button><figure><img alt=""><figcaption></figcaption></figure><button type="button" class="cs-nav n" aria-label="Next image">›</button></div>`;
  document.body.appendChild(root);
  root.querySelector('.cs-back').onclick = closeCase;
  root.querySelector('.cs-book').onclick = () => opts.book && opts.book();
  const lb = root.querySelector('.cs-lb');
  lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('.cs-lbx')) lb.hidden = true; });
  lb.querySelector('.p').onclick = () => shot(shotI - 1); lb.querySelector('.n').onclick = () => shot(shotI + 1);
  addEventListener('keydown', e => {
    if (!caseOpen() || document.querySelector('dialog[open]')) return;
    if (e.key === 'Escape') { e.stopImmediatePropagation(); lb.hidden ? closeCase() : (lb.hidden = true); }
    else if (!lb.hidden && e.key === 'ArrowLeft') shot(shotI - 1); else if (!lb.hidden && e.key === 'ArrowRight') shot(shotI + 1);
  }, true);
}
function shot(i) {
  if (!shots.length) return; shotI = (i + shots.length) % shots.length; const lb = root.querySelector('.cs-lb'), s = shots[shotI];
  lb.querySelector('img').src = s.src; lb.querySelector('img').alt = s.alt || ''; lb.querySelector('figcaption').textContent = s.alt || ''; lb.hidden = false;
}
const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
function gallery(list) {
  return `<div class="cs-grid">${list.map(g => { const k = shots.push(g) - 1; return `<button type="button" class="cs-shot" data-k="${k}"><img src="${g.src}" alt="${esc(g.alt || '')}" loading="lazy"></button>`; }).join('')}</div>`;
}

export async function openCase(id, o = {}) {
  const p = PROJECTS.find(x => x.id === id); if (!p) return;
  if (!root) mount(); opts = o; lastFocus = document.activeElement; shots = [];
  const c = (await load())[id] || {}; const inn = root.querySelector('.cs-in');
  root.querySelector('.cs-name').textContent = p.title;
  root.querySelector('.cs-back').textContent = o.backLabel || 'Back to studio';
  const meta = [['Client', c.client || p.title], ['Industry', c.industry], ['Timeline', c.timeline]].filter(m => m[1]);
  const stills = [...(c.gallery || []), ...((c.campaigns || []).flatMap(k => k.images))], heroImg = stills[0] || null, clips = p.media.filter(m => m.type === 'video');
  const films = p.films || [], watch = films.length ? films : clips.length ? clips : p.media;     // the films when there are any, else the clips: video is the first thing on the page
  let h = `<header class="cs-head"><p class="kind">${esc(p.kind)}</p><h1>${esc(p.title)}</h1>
    <dl class="cs-meta">${meta.map(m => `<div><dt>${m[0]}</dt><dd>${esc(m[1])}</dd></div>`).join('')}</dl>
    ${c.services && c.services.length ? `<ul class="cs-chips">${c.services.map(s => `<li>${esc(s)}</li>`).join('')}</ul>` : ''}${c.store ? `<p class="cs-store"><a class="cta hot" href="${c.store}" target="_blank" rel="noopener"><span>See in the App Store</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4l8 8-8 8zM13 4l8 8-8 8z"/></svg></a></p>` : ''}</header>
    <div class="cs-hero${watch.length ? ' vid' : ''}">${watch.length ? `<div class="cs-stage"></div><div class="tabs cs-tabs"></div>` : heroImg ? `<img class="cs-big" src="${heroImg.src}" alt="${esc(heroImg.alt || p.title)}">` : ''}</div>
    <section class="cs-lead">${p.body.map(b => `<p>${esc(b)}</p>`).join('')}</section>`;
  if (c.campaigns && c.campaigns.length) h += c.campaigns.map(k => `<section class="cs-camp"><h2>${esc(k.title)}</h2><p class="sub">${esc(k.sub)}</p><p>${esc(k.text)}</p>${gallery(k.images)}</section>`).join('');
  if (c.approach && c.approach.length) h += `<section><h2>Approach</h2><ol class="cs-steps">${c.approach.map((a, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b><h3>${esc(a.title)}</h3><p>${esc(a.text)}</p></li>`).join('')}</ol></section>`;
  if (c.gallery && c.gallery.length) h += `<section><h2>Gallery</h2>${gallery(c.gallery)}</section>`;
  if ((c.results && c.results.length) || (c.tools && c.tools.length)) h += `<section class="cs-two">${c.results && c.results.length ? `<div><h2>Results</h2><ul class="cs-list">${c.results.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div>` : ''}${c.tools && c.tools.length ? `<div><h2>Tools</h2><ul class="cs-chips">${c.tools.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div>` : ''}</section>`;
  h += `<section class="cs-cta"><h2>Have something like this in mind?</h2><div class="cs-btns">${c.store ? `<a class="cta" href="${c.store}" target="_blank" rel="noopener">See in the App Store</a>` : ''}<button type="button" class="cta cs-book2">Book a call</button></div></section>`;
  inn.innerHTML = h;
  // hero player
  const stage = inn.querySelector('.cs-stage'), tabs = inn.querySelector('.cs-tabs');
  const put = m => {
    stage.innerHTML = '';
    if (m.type === 'film') { const f = document.createElement('iframe'); f.src = `https://www-ccv.adobe.io/v1/player/ccv/${encodeURIComponent(m.id)}/embed?bgcolor=%23101010&lazyLoading=true&api_key=BehancePro2View`;
      f.allow = 'autoplay; fullscreen; encrypted-media'; f.allowFullscreen = true; f.title = p.title + ': ' + m.label; f.className = 'cs-frame'; stage.appendChild(f); return; }
    if (m.type === 'image') { const i = new Image(); i.src = m.src; i.alt = p.title + ': ' + m.label; stage.appendChild(i); return; }
    const v = document.createElement('video'); v.controls = true; v.muted = !(m.sound && o.sound); v.loop = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.preload = 'metadata'; if (m.poster) v.poster = m.poster; v.src = m.src;
    stage.appendChild(v); v.play().catch(() => { });
  };
  if (stage) put(watch[0]);
  if (stage && watch.length > 1) watch.forEach((m, i) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = m.label; b.setAttribute('aria-pressed', i === 0); b.onclick = () => { [...tabs.children].forEach(x => x.setAttribute('aria-pressed', x === b)); put(m); }; tabs.appendChild(b); });
  inn.querySelectorAll('.cs-shot').forEach(b => b.onclick = () => shot(+b.dataset.k));
  inn.querySelector('.cs-book2').onclick = () => opts.book && opts.book();
  root.hidden = false; root.querySelector('.cs-scroll').scrollTop = 0; root.querySelector('.cs-lb').hidden = true;
  requestAnimationFrame(() => root.classList.add('on')); root.querySelector('.cs-back').focus({ preventScroll: true });
  document.documentElement.classList.add('incase'); o.onOpen && o.onOpen();
}
export function closeCase() {
  if (!caseOpen()) return;
  root.classList.remove('on'); root.querySelectorAll('video').forEach(v => v.pause()); root.querySelectorAll('iframe').forEach(f => f.remove());
  document.documentElement.classList.remove('incase');
  setTimeout(() => { root.hidden = true; root.querySelector('.cs-in').innerHTML = ''; }, 320);
  opts.onClose && opts.onClose(); if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
}
