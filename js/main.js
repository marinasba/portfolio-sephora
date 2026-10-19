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
    document.querySelectorAll('.pop-x').forEach(function (x) { x.setAttribute('aria-label', t.fermer); });
    document.querySelectorAll('[data-cv]').forEach(function (cv) { cv.setAttribute('href', t.cv); });
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
  document.querySelectorAll('.adjs, .lustre').forEach(function (el) { io.observe(el); });

  /* ---------- galeries : flèches ---------- */
  document.querySelectorAll('.galerie-wrap').forEach(function (wrap) {
    var gal = wrap.querySelector('.galerie');
    var prev = wrap.querySelector('.fleche.prev');
    var next = wrap.querySelector('.fleche.next');
    if (!gal || !prev || !next) return;
    function step() { var c = gal.firstElementChild; return c ? c.getBoundingClientRect().width + 16 : 300; }
    function state() {
      prev.disabled = gal.scrollLeft <= 2;
      next.disabled = gal.scrollLeft + gal.clientWidth >= gal.scrollWidth - 2;
      // pas de flèches si tout tient sur la ligne ; sinon, flèches au milieu de la photo
      wrap.classList.toggle('fixe', gal.scrollWidth <= gal.clientWidth + 2);
      var ph = gal.querySelector('.ph');
      if (ph) prev.style.top = next.style.top = (ph.offsetTop + ph.offsetHeight / 2) + 'px';
    }
    prev.addEventListener('click', function () { gal.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { gal.scrollBy({ left: step(), behavior: 'smooth' }); });
    gal.addEventListener('scroll', state, { passive: true });
    window.addEventListener('resize', state);
    state();
  });

  /* ---------- autres travaux : fenêtres de détails ---------- */
  function fermer(d) { d.close(); }
  document.querySelectorAll('[data-pop]').forEach(function (b) {
    b.addEventListener('click', function () {
      var d = document.getElementById(b.dataset.pop);
      if (!d || !d.showModal) return;
      d.showModal(); root.classList.add('pop-ouvert');
    });
  });
  document.querySelectorAll('dialog.pop').forEach(function (d) {
    d.querySelector('.pop-x').addEventListener('click', function () { fermer(d); });
    // un clic hors de la fenêtre la ferme
    d.addEventListener('click', function (e) {
      var r = d.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) fermer(d);
    });
    d.addEventListener('close', function () { root.classList.remove('pop-ouvert'); });
  });

  /* ---------- catalogues : agrandissement au clic ---------- */
  var zoom = document.getElementById('zoom');
  if (zoom && zoom.showModal) {
    var zimg = zoom.querySelector('img');
    document.querySelectorAll('img[data-zoom]').forEach(function (im) {
      im.setAttribute('tabindex', '0');
      im.setAttribute('role', 'button');
      function ouvrir() {
        zimg.src = im.dataset.full || im.currentSrc || im.src; zimg.alt = im.alt;
        zoom.showModal(); root.classList.add('pop-ouvert');
      }
      im.addEventListener('click', function (e) { e.stopPropagation(); ouvrir(); });
      im.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ouvrir(); }
      });
    });
  }

  /* ---------- effets liés à la position de scroll ---------- */
  var pv = document.getElementById('pv');
  var pvStick = pv ? pv.querySelector('.stick') : null;
  var screen = document.getElementById('screen');
  var tlSteps = document.querySelectorAll('#tl li:not(.tl-fin)');
  var tampon = document.getElementById('tampon');

  function clamp(v) { return Math.min(1, Math.max(0, v)); }

  // les blocs fixés ont la hauteur de leur contenu, centré dans l'écran
  function centerStick(stick) {
    if (!stick) return 0;
    var top = Math.max(0, Math.round((window.innerHeight - stick.offsetHeight) / 2));
    stick.style.top = top + 'px';
    return top;
  }
  function layout() {
    centerStick(pvStick);
  }
  layout();

  // progression 0 → 1 d'une section fixée : de l'accroche au relâchement
  function progress(sec, stick) {
    var r = sec.getBoundingClientRect();
    var top = parseFloat(stick.style.top) || 0;
    return clamp((top - r.top) / Math.max(1, r.height - stick.offsetHeight));
  }


  function onScroll() {
    var vh = window.innerHeight;


    // paravent : 0° → 180°
    if (pv && pvStick && screen) {
      var deg = progress(pv, pvStick) * 180;
      screen.style.transform = 'rotateY(' + deg + 'deg)';
      pv.classList.toggle('half', deg > 90);
    }

    // timeline : chaque étape s'allume quand elle passe aux deux tiers de l'écran
    tlSteps.forEach(function (li) {
      li.classList.toggle('on', li.getBoundingClientRect().top < vh * 0.7);
    });
    if (tampon && tampon.getBoundingClientRect().top < vh * 0.85) tampon.classList.add('in');

  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(function () { onScroll(); ticking = false; }); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', function () { layout(); onScroll(); });
  window.addEventListener('load', function () { layout(); onScroll(); });
  onScroll();
})();
