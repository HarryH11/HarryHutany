/* Harry Hutany portfolio: nav and current-section highlight. */
(function () {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  /* ── Nav: mobile menu and current section ── */
  const toggle = document.querySelector('.nav__toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    const setOpen = (open) => { links.classList.toggle('is-open', open); toggle.setAttribute('aria-expanded', String(open)); };
    toggle.addEventListener('click', () => setOpen(!links.classList.contains('is-open')));
    links.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && links.classList.contains('is-open')) { setOpen(false); toggle.focus(); } });
  }
  const navLinks = Array.from(document.querySelectorAll('.nav__links a[data-target]'));
  const sectionFor = (id) => { const el = document.getElementById(id); return el && (el.closest('main > section') || el); };
  if (navLinks.length && 'IntersectionObserver' in window) {
    const map = new Map();
    navLinks.forEach((a) => { const s = sectionFor(a.dataset.target); if (s) map.set(s, a); });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const a = map.get(e.target);
        if (!a) return;
        if (e.isIntersecting) { navLinks.forEach((l) => l.removeAttribute('aria-current')); a.setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, s) => io.observe(s));
  }
})();
