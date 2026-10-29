/* ============ PawRoute — shared script ============ */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion;

  /* ---------- Inject nav + footer (edit once, updates every page) ---------- */
  const pages = [
    ['index.html', 'Home'], ['features.html', 'Features'], ['routes.html', 'Route Lab'],
    ['pricing.html', 'Pricing'], ['stories.html', 'Stories'], ['about.html', 'About'], ['contact.html', 'Contact']
  ];
  const here = location.pathname.split('/').pop() || 'index.html';
  const navHTML = `
  <nav id="nav" aria-label="Primary">
    <a href="index.html" class="logo"><span>🐾</span>PawRoute</a>
    <button class="burger" id="burger" type="button" aria-label="Open menu" aria-controls="links" aria-expanded="false">☰</button>
    <div class="links" id="links">
      ${pages.map(([h, t]) => `<a href="${h}" class="${h === here ? 'active' : ''}"${h === here ? ' aria-current="page"' : ''}>${t}</a>`).join('')}
    </div>
    <a href="contact.html" class="btn" style="padding:.6rem 1.2rem;font-size:.9rem">Get early access</a>
  </nav>`;
  const footHTML = `
  <footer><div class="wrap">
    <div class="fgrid">
      <div><a href="index.html" class="logo"><span>🐾</span>PawRoute</a>
        <p style="color:var(--muted);margin-top:1rem;max-width:300px">Smart route planning for mobile pet groomers. More dogs. Less driving. Happier days.</p></div>
      <div><h4>Product</h4><a href="features.html">Features</a><a href="routes.html">Route Lab</a><a href="pricing.html">Pricing</a></div>
      <div><h4>Company</h4><a href="about.html">About</a><a href="stories.html">Stories</a><a href="contact.html">Contact</a></div>
      <div><h4>Say hi</h4><a href="mailto:hello@pawroute.example">hello@pawroute.example</a><a href="contact.html">Join the waitlist</a></div>
    </div>
    <p class="copy">© ${new Date().getFullYear()} PawRoute. Built with ♥ and way too much CSS.</p>
  </div></footer>`;
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="progress" id="progress"></div>
    <canvas id="fx"></canvas>
    <div class="aurora"><i></i><i></i><i></i></div>
    <div class="glow" id="glow"></div>` + navHTML);
  document.body.insertAdjacentHTML('beforeend', footHTML);

  const burger = $('#burger'), links = $('#links'), nav = $('#nav');
  const setMenuOpen = open => {
    links.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    burger.textContent = open ? '×' : '☰';
  };
  burger.addEventListener('click', () => setMenuOpen(burger.getAttribute('aria-expanded') !== 'true'));
  links.addEventListener('click', e => {
    if (e.target.closest('a')) setMenuOpen(false);
  });
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      burger.focus();
    }
  });
  addEventListener('pointerdown', e => {
    if (burger.getAttribute('aria-expanded') === 'true' && !nav.contains(e.target)) setMenuOpen(false);
  });
  matchMedia('(min-width: 901px)').addEventListener('change', e => {
    if (e.matches) setMenuOpen(false);
  });

  /* ---------- Scroll: progress bar + nav state ---------- */
  const prog = $('#progress');
  addEventListener('scroll', () => {
    const h = document.documentElement;
    prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + '%';
    nav.classList.toggle('scrolled', h.scrollTop > 30);
  }, { passive: true });

  /* ---------- Cursor glow ---------- */
  const glow = $('#glow');
  let mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  if (canHover) addEventListener('pointermove', e => {
    mouse.x = e.clientX; mouse.y = e.clientY;
    glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px';
  });

  /* ---------- Particle constellation ---------- */
  const cv = $('#fx'), cx = cv.getContext('2d');
  if (cx && !reduceMotion) {
    let W, H, pts = [];
    const resize = () => {
      W = cv.width = innerWidth; H = cv.height = innerHeight;
      pts = Array.from({ length: Math.min(90, Math.floor(W * H / 20000)) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.8 + .6
      }));
    };
    resize(); addEventListener('resize', resize);
    (function loop() {
      cx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 140 && d > 0) { p.x += dx / d * 1.4; p.y += dy / d * 1.4; }
        cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 7); cx.fillStyle = 'rgba(200,180,255,.6)'; cx.fill();
      }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 130) {
          cx.strokeStyle = `rgba(160,120,255,${.18 * (1 - d / 130)})`;
          cx.beginPath(); cx.moveTo(pts[i].x, pts[i].y); cx.lineTo(pts[j].x, pts[j].y); cx.stroke();
        }
      }
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12 });
  $$('.rv').forEach(el => io.observe(el));

  /* ---------- Card spotlight + 3D tilt ---------- */
  if (canHover) $$('.card').forEach(c => {
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      c.style.setProperty('--mx', x + 'px'); c.style.setProperty('--my', y + 'px');
      const rx = ((y / r.height) - .5) * -8, ry = ((x / r.width) - .5) * 8;
      c.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    c.addEventListener('pointerleave', () => c.style.transform = '');
  });

  /* ---------- Magnetic buttons ---------- */
  if (canHover) $$('.btn').forEach(b => {
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .15}px,${(e.clientY - r.top - r.height / 2) * .25 - 3}px)`;
    });
    b.addEventListener('pointerleave', () => b.style.transform = '');
  });

  /* ---------- Counters ---------- */
  const counters = $$('[data-count]');
  if (reduceMotion) {
    counters.forEach(el => {
      el.textContent = (+el.dataset.count).toLocaleString() + (el.dataset.suffix || '');
    });
  } else {
    const cio = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, to = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now();
      const tick = t => {
        const k = Math.min(1, (t - t0) / 1800), v = to * (1 - Math.pow(1 - k, 4));
        el.textContent = Math.round(v).toLocaleString() + suf;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick); cio.unobserve(el);
    }), { threshold: .6 });
    counters.forEach(el => cio.observe(el));
  }

  /* ---------- Typewriter ---------- */
  const tw = $('#typed');
  if (tw) {
    const words = JSON.parse(tw.dataset.words);
    if (reduceMotion) tw.textContent = words[0];
    else {
      let w = 0, i = 0, del = false;
      (function step() {
        const word = words[w];
        tw.textContent = word.slice(0, i);
        if (!del && i === word.length) { del = true; return setTimeout(step, 1400); }
        if (del && i === 0) { del = false; w = (w + 1) % words.length; }
        i += del ? -1 : 1;
        setTimeout(step, del ? 35 : 80);
      })();
    }
  }

  /* ---------- Route optimizer demo ---------- */
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const length = r => r.reduce((s, p, i) => i ? s + dist(r[i - 1], p) : 0, 0);
  const nearest = (stops, start) => {
    const left = stops.slice(), route = [start];
    while (left.length) {
      const last = route[route.length - 1];
      left.sort((a, b) => dist(last, a) - dist(last, b));
      route.push(left.shift());
    }
    return route;
  };
  const twoOpt = r => {
    let best = r.slice(), improved = true;
    while (improved) {
      improved = false;
      for (let i = 1; i < best.length - 1; i++) for (let j = i + 1; j < best.length; j++) {
        const cand = best.slice(0, i).concat(best.slice(i, j + 1).reverse(), best.slice(j + 1));
        if (length(cand) < length(best) - 1e-6) { best = cand; improved = true; }
      }
    }
    return best;
  };
  window.initRouteDemo = (svg, count = 9) => {
    const NS = 'http://www.w3.org/2000/svg', VW = 600, VH = 400;
    const names = ['Biscuit', 'Luna', 'Max', 'Milo', 'Daisy', 'Coco', 'Rocky', 'Bella', 'Charlie', 'Ruby', 'Teddy', 'Nala'];
    const statEl = $('#demo-stats');
    let n = count;
    const draw = () => {
      svg.innerHTML = `<defs><linearGradient id="pg" x1="0" x2="1"><stop offset="0" stop-color="#8b5cf6"/><stop offset=".5" stop-color="#ec4899"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs>`;
      for (let g = 0; g < VW; g += 50) svg.insertAdjacentHTML('beforeend', `<line x1="${g}" y1="0" x2="${g}" y2="${VH}" stroke="rgba(255,255,255,.04)"/>`);
      for (let g = 0; g < VH; g += 50) svg.insertAdjacentHTML('beforeend', `<line x1="0" y1="${g}" x2="${VW}" y2="${g}" stroke="rgba(255,255,255,.04)"/>`);
      const home = { x: 60 + Math.random() * 60, y: 60 + Math.random() * 280 };
      const stops = Array.from({ length: n }, (_, i) => ({ x: 120 + Math.random() * 440, y: 35 + Math.random() * 330, name: names[i % names.length] }));
      const naive = [home, ...stops], smart = twoOpt(nearest(stops, home));
      const a = length(naive), b = length(smart), saved = Math.max(0, Math.round((1 - b / a) * 100));
      const poly = (r, extra) => { const p = document.createElementNS(NS, 'polyline'); p.setAttribute('points', r.map(q => q.x + ',' + q.y).join(' ')); Object.entries(extra).forEach(([k, v]) => p.setAttribute(k, v)); return p; };
      svg.appendChild(poly(naive, { fill: 'none', stroke: 'rgba(255,255,255,.16)', 'stroke-width': 2, 'stroke-dasharray': '5 7' }));
      const line = poly(smart, { class: 'path-line' }); svg.appendChild(line);
      smart.forEach((p, i) => {
        const g = document.createElementNS(NS, 'g');
        g.style.cssText = `opacity:0;animation:pop .5s ${.15 * i}s forwards`;
        g.innerHTML = i === 0
          ? `<circle cx="${p.x}" cy="${p.y}" r="15" fill="#22d3ee"/><text x="${p.x}" y="${p.y + 5}" text-anchor="middle" font-size="15">🚐</text>`
          : `<circle cx="${p.x}" cy="${p.y}" r="13" fill="#0a0814" stroke="#ec4899" stroke-width="2"/><text x="${p.x}" y="${p.y + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">${i}</text><text x="${p.x}" y="${p.y - 19}" text-anchor="middle" font-size="10" fill="#a29fba">${p.name}</text>`;
        svg.appendChild(g);
      });
      if (statEl) statEl.innerHTML = `<span class="stat-pill">Naive drive <b>${Math.round(a / 10)} km</b></span><span class="stat-pill">PawRoute <b>${Math.round(b / 10)} km</b></span><span class="stat-pill">Saved <b>${saved}%</b></span>`;
    };
    if (!$('#pop-kf')) document.head.insertAdjacentHTML('beforeend', '<style id="pop-kf">@keyframes pop{from{opacity:0;transform:scale(.2)}to{opacity:1;transform:none}}svg g{transform-box:fill-box;transform-origin:center}</style>');
    draw();
    return { shuffle: draw, setCount: v => { n = v; draw(); } };
  };
  const demo = $('#route-svg');
  if (demo) {
    const api = initRouteDemo(demo, +demo.dataset.stops || 9);
    $('#shuffle')?.addEventListener('click', api.shuffle);
    $('#stops')?.addEventListener('input', e => { $('#stops-val').textContent = e.target.value; api.setCount(+e.target.value); });
  }

  /* ---------- Pricing toggle ---------- */
  $$('.toggle button').forEach(btn => btn.addEventListener('click', () => {
    $$('.toggle button').forEach(b => b.classList.remove('on')); btn.classList.add('on');
    const yearly = btn.dataset.mode === 'yearly';
    $$('[data-m]').forEach(el => el.textContent = yearly ? el.dataset.y : el.dataset.m);
  }));

  /* ---------- Savings calculator ---------- */
  const calc = $('#calc');
  if (calc) {
    const upd = () => {
      const dogs = +$('#c-dogs').value, km = +$('#c-km').value, price = +$('#c-price').value;
      $('#c-dogs-v').textContent = dogs; $('#c-km-v').textContent = km; $('#c-price-v').textContent = '€' + price;
      const savedKm = km * .27 * 5 * 4.3, fuel = savedKm * .11;
      const hoursSaved = savedKm / 38 + dogs * 0.05 * 4.3;
      const extraDogs = Math.floor(hoursSaved / 1.5), extraRevenue = extraDogs * price;
      $('#o-rev').textContent = '€' + Math.round(extraRevenue + fuel).toLocaleString();
      $('#o-hrs').textContent = Math.round(hoursSaved) + ' h';
      $('#o-dogs').textContent = '+' + extraDogs;
    };
    $$('input', calc).forEach(i => i.addEventListener('input', upd)); upd();
  }

  /* ---------- Contact form (opens mail client; swap for Formspree later) ---------- */
  const form = $('#contact-form');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const body = encodeURIComponent(`Name: ${d.name}\nSalon/van: ${d.biz || '-'}\n\n${d.msg}`);
    location.href = `mailto:hello@pawroute.example?subject=${encodeURIComponent('PawRoute early access: ' + d.name)}&body=${body}`;
    form.innerHTML = '<div class="center" style="padding:2rem"><div style="font-size:4rem">🐶</div><h3>Woof! Almost there.</h3><p class="lead">Your mail app should have opened. Hit send and you are on the list.</p></div>';
  });

  /* ---------- Konami easter egg: paw rain ---------- */
  let seq = [], code = 'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a';
  addEventListener('keydown', e => {
    seq.push(e.key); seq = seq.slice(-10);
    if (!reduceMotion && seq.join() === code) for (let i = 0; i < 60; i++) {
      const p = document.createElement('div'); p.textContent = '🐾';
      p.style.cssText = `position:fixed;top:-40px;left:${Math.random() * 100}vw;font-size:${20 + Math.random() * 30}px;z-index:999;pointer-events:none;transition:transform ${2 + Math.random() * 2}s linear,opacity 3s`;
      document.body.appendChild(p);
      requestAnimationFrame(() => { p.style.transform = `translateY(110vh) rotate(${Math.random() * 720}deg)`; p.style.opacity = 0; });
      setTimeout(() => p.remove(), 4500);
    }
  });
})();
