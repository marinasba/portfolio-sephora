(function () {
  var root = document.documentElement;
  root.classList.add('js');

  /* ---------- langue ---------- */
  var LANGS = ['fr', 'de', 'en'];
  function setLang(l) {
    if (LANGS.indexOf(l) < 0) l = 'fr';
    var t = window.I18N[l];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (t[k] != null) el.innerHTML = t[k];
    });
    document.title = t._html_title;
    root.lang = l;
    var cv = document.querySelector('[data-cv]');
    if (cv) cv.setAttribute('href', t.cv);
    document.querySelectorAll('.ed button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.lang === l ? 'true' : 'false');
    });
    try { localStorage.setItem('lang', l); } catch (e) {}
    if (location.hash.replace('#', '') !== l) history.replaceState(null, '', '#' + l);
  }
  document.querySelectorAll('.ed button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });
  var initial = location.hash.replace('#', '');
  if (LANGS.indexOf(initial) < 0) {
    try { initial = localStorage.getItem('lang') || ''; } catch (e) { initial = ''; }
  }
  if (LANGS.indexOf(initial) < 0) {
    var nav = (navigator.language || 'fr').slice(0, 2);
    initial = LANGS.indexOf(nav) >= 0 ? nav : 'fr';
  }
  setLang(initial);

  /* ---------- reveals au scroll (une seule fois) ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.rv, .board, .bath, .adjs, .lustre, .temps').forEach(function (el) { io.observe(el); });

  /* ---------- effets liés à la position de scroll ---------- */
  var pv = document.getElementById('pv');
  var screen = document.getElementById('screen');
  var robe = document.getElementById('robe');
  var tl = document.getElementById('tl');

  function clamp(v) { return Math.min(1, Math.max(0, v)); }

  function onScroll() {
    var vh = window.innerHeight;

    // paravent : 0° → 180° sur la hauteur de la section collante
    if (pv && screen) {
      var r = pv.getBoundingClientRect();
      var p = clamp(-r.top / (r.height - vh));
      var deg = p * 180;
      screen.style.transform = 'rotateY(' + deg + 'deg)';
      pv.classList.toggle('half', deg > 90);
    }

    // timeline : le fil d'or se dessine en descendant
    if (tl) {
      var t = tl.getBoundingClientRect();
      var tp = clamp((vh * 0.75 - t.top) / t.height);
      tl.style.setProperty('--tl-p', tp);
    }

    // robe de bal : tourne avec le défilement
    if (robe) {
      var rr = robe.getBoundingClientRect();
      robe.style.transform = 'rotate(' + ((vh - rr.top) * 0.12) + 'deg)';
    }
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(function () { onScroll(); ticking = false; }); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
