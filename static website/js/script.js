  /* ── Hamburger toggle ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });

  /* Close menu when a link is tapped */
  document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });

  /* ── Scroll reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  reveals.forEach(el => revealObs.observe(el));

  /* ── Active nav highlight on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('#desktopNav a');
  const mobileLinks  = document.querySelectorAll('.mobile-nav-links a');

  function setActive() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 80) current = s.id;
    });
    [...desktopLinks, ...mobileLinks].forEach(a => {
      const href = a.getAttribute('href');
      if (href === '#' + current) {
        a.classList.add('active');
      } else if (href.startsWith('#')) {
        a.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();