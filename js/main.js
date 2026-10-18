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
  document.querySelectorAll('.rv, .board, .adjs, .lustre, .temps').forEach(function (el) { io.observe(el); });

  /* ---------- galerie : flèches ---------- */
  var gal = document.getElementById('galerie');
  var galPrev = document.getElementById('galPrev');
  var galNext = document.getElementById('galNext');
  if (gal && galPrev && galNext) {
    function galStep() { var c = gal.firstElementChild; return c ? c.getBoundingClientRect().width + 16 : 300; }
    function galState() {
      galPrev.disabled = gal.scrollLeft <= 2;
      galNext.disabled = gal.scrollLeft + gal.clientWidth >= gal.scrollWidth - 2;
    }
    galPrev.addEventListener('click', function () { gal.scrollBy({ left: -galStep(), behavior: 'smooth' }); });
    galNext.addEventListener('click', function () { gal.scrollBy({ left: galStep(), behavior: 'smooth' }); });
    gal.addEventListener('scroll', galState, { passive: true });
    window.addEventListener('resize', galState);
    galState();
  }

  /* ---------- effets liés à la position de scroll ---------- */
  var pv = document.getElementById('pv');
  var screen = document.getElementById('screen');
  var robe = document.getElementById('robe');
  var envers = document.getElementById('envers');
  var tl = document.getElementById('tl');
  var tlprog = document.getElementById('tlprog');
  var tlDist = 0;

  function clamp(v) { return Math.min(1, Math.max(0, v)); }

  // hauteur de la section = ce qu'il faut défiler pour voir toute la piste
  function sizeEnvers() {
    if (!envers || !tl) return;
    tlDist = Math.max(0, tl.scrollWidth - window.innerWidth + 40);
    envers.style.height = (window.innerHeight + tlDist) + 'px';
  }
  sizeEnvers();

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

    // timeline horizontale : la piste glisse vers la gauche pendant le défilement
    if (envers && tl) {
      var e = envers.getBoundingClientRect();
      var ep = clamp(-e.top / Math.max(1, e.height - vh));
      tl.style.transform = 'translateX(' + (-ep * tlDist) + 'px)';
      if (tlprog) tlprog.style.width = (ep * 100) + '%';
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
  window.addEventListener('resize', function () { sizeEnvers(); onScroll(); });
  window.addEventListener('load', function () { sizeEnvers(); onScroll(); });
  onScroll();
})();
