/* ===== AVIOR — Main JavaScript ===== */
(function () {
  'use strict';

  /* ---------- LOADER ---------- */
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.getElementById('loader').classList.add('hidden');
    }, 2200);
  });

  /* ---------- NAVBAR SCROLL ---------- */
  var navbar = document.getElementById('navbar');
  var backToTop = document.getElementById('back-to-top');
  var waFloat = document.getElementById('whatsapp-float');
  var progressTrack = document.querySelector('.scroll-progress-track');

  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (y > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    if (y > 500) {
      backToTop.classList.add('visible');
      waFloat.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
      waFloat.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- MOBILE NAV ---------- */
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');
  toggle.addEventListener('click', function () {
    toggle.classList.toggle('active');
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('.nav-link').forEach(function (l) {
    l.addEventListener('click', function () {
      toggle.classList.remove('active');
      menu.classList.remove('open');
    });
  });

  /* ---------- ACTIVE NAV ON SCROLL ---------- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', function () {
    var cur = '';
    sections.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - 200) cur = s.getAttribute('id');
    });
    navLinks.forEach(function (l) {
      l.classList.remove('active');
      if (l.getAttribute('href') === '#' + cur) l.classList.add('active');
    });
  });

  /* ---------- HERO PARTICLE CANVAS ---------- */
  var hc = document.getElementById('hero-canvas');
  var ctx = hc.getContext('2d');
  var particles = [];

  function resizeHero() {
    hc.width = window.innerWidth;
    hc.height = window.innerHeight;
  }
  resizeHero();
  window.addEventListener('resize', resizeHero);

  for (var i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * hc.width,
      y: Math.random() * hc.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      a: Math.random() * 0.5 + 0.1
    });
  }

  function animHero() {
    ctx.clearRect(0, 0, hc.width, hc.height);
    particles.forEach(function (p) {
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0) p.x = hc.width;
      if (p.x > hc.width) p.x = 0;
      if (p.y < 0) p.y = hc.height;
      if (p.y > hc.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(201,168,76,' + p.a + ')';
      ctx.fill();
    });
    requestAnimationFrame(animHero);
  }
  animHero();

  /* ---------- SCROLL REVEAL (Intersection Observer) ---------- */
  var revealItems = document.querySelectorAll('.reveal-item');
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach(function (el) { revealObs.observe(el); });

  /* ---------- FILTER ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.product-card');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.dataset.filter;
      cards.forEach(function (c) {
        if (f === 'all' || c.dataset.category === f) {
          c.classList.remove('hidden-card');
        } else {
          c.classList.add('hidden-card');
        }
      });
    });
  });

  /* ---------- CONTACT FORM ---------- */
  document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = document.getElementById('submit-btn');
    btn.innerHTML = '<span>Message Sent! ✓</span>';
    btn.style.background = '#2d6a4f';
    setTimeout(function () {
      btn.innerHTML = '<span>Send Message</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
      btn.style.background = '';
      e.target.reset();
    }, 2500);
  });

  /* ---------- GSAP EXPLODED WATCH ---------- */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    var explodedSection = document.getElementById('exploded-section');
    var assembledWatch = document.getElementById('assembled-watch');
    var assembledText = document.querySelector('.assembled-text');
    var scrollFill = document.getElementById('scroll-progress');

    // Show/hide scroll progress bar
    ScrollTrigger.create({
      trigger: explodedSection,
      start: 'top top',
      end: 'bottom bottom',
      onEnter: function () { progressTrack.classList.add('visible'); },
      onLeave: function () { progressTrack.classList.remove('visible'); },
      onEnterBack: function () { progressTrack.classList.add('visible'); },
      onLeaveBack: function () { progressTrack.classList.remove('visible'); },
      onUpdate: function (self) {
        scrollFill.style.height = (self.progress * 100) + '%';
      }
    });

    // Master timeline pinned to section
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: explodedSection,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: '.exploded-container',
        anticipatePin: 1
      }
    });

    // Part animation data
    var partsData = [
      { id: '#part-1', label: '#label-1', from: { y: 400, opacity: 0 } },
      { id: '#part-2', label: '#label-2', from: { x: -300, y: 300, opacity: 0 } },
      { id: '#part-3', label: '#label-3', from: { y: 200, opacity: 0 } },
      { id: '#part-4', label: '#label-4', from: { scale: 0.5, opacity: 0 } },
      { id: '#part-5', label: '#label-5', from: { x: 300, opacity: 0 } },
      { id: '#part-6', label: '#label-6', from: { y: -200, rotateX: 45, opacity: 0 } },
      { id: '#part-7', label: '#label-7', from: { scale: 0, rotate: 180, opacity: 0 } },
      { id: '#part-8', label: '#label-8', from: { y: -150, opacity: 0 } },
      { id: '#part-9', label: '#label-9', from: { y: -200, rotate: -30, opacity: 0 } },
      { id: '#part-10', label: '#label-10', from: { y: -300, opacity: 0, scale: 1.2 } }
    ];

    partsData.forEach(function (p, i) {
      var pos = i === 0 ? '0' : '>' + (i < 3 ? '-=0.3' : '-=0.2');
      tl.fromTo(p.id, p.from, {
        x: 0, y: 0, scale: 1, rotate: 0, rotateX: 0, opacity: 1,
        duration: 1, ease: 'power2.out'
      }, pos);
      tl.to(p.label, {
        opacity: 1, duration: 0.5, ease: 'power1.out',
        onStart: function () {
          document.querySelector(p.label).classList.add('visible');
        }
      }, '<+=0.3');
    });

    // Final: fade all parts + labels, show assembled
    tl.to('.watch-part', { opacity: 0, duration: 0.8, stagger: 0.03 }, '+=0.5');
    tl.to('.part-label', { opacity: 0, duration: 0.4 }, '<');
    tl.to(assembledWatch, { opacity: 1, duration: 1, ease: 'power2.inOut' }, '<+=0.3');
    tl.to(assembledText, { opacity: 1, duration: 0.8, ease: 'power1.out' }, '<+=0.5');

    // Gold particle burst on assembled reveal
    var pc = document.getElementById('particle-canvas');
    var pctx = pc.getContext('2d');
    var burstParticles = [];
    var burstActive = false;

    function resizeParticle() {
      pc.width = pc.parentElement.offsetWidth;
      pc.height = pc.parentElement.offsetHeight;
    }
    resizeParticle();
    window.addEventListener('resize', resizeParticle);

    function triggerBurst() {
      if (burstActive) return;
      burstActive = true;
      burstParticles = [];
      var cx = pc.width / 2, cy = pc.height / 2;
      for (var j = 0; j < 80; j++) {
        var angle = Math.random() * Math.PI * 2;
        var speed = Math.random() * 4 + 1;
        burstParticles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: Math.random() * 3 + 1,
          life: 1,
          decay: Math.random() * 0.015 + 0.005
        });
      }
    }

    function animBurst() {
      pctx.clearRect(0, 0, pc.width, pc.height);
      burstParticles.forEach(function (p) {
        p.x += p.vx; p.y += p.vy;
        p.life -= p.decay;
        if (p.life > 0) {
          pctx.beginPath();
          pctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
          pctx.fillStyle = 'rgba(201,168,76,' + p.life + ')';
          pctx.fill();
        }
      });
      burstParticles = burstParticles.filter(function (p) { return p.life > 0; });
      if (burstParticles.length === 0) burstActive = false;
      requestAnimationFrame(animBurst);
    }
    animBurst();

    // Trigger burst when assembled watch becomes visible
    ScrollTrigger.create({
      trigger: explodedSection,
      start: 'bottom-=200% top',
      onEnter: triggerBurst,
      onEnterBack: triggerBurst
    });
  }

  /* ---------- SMOOTH ANCHOR SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
