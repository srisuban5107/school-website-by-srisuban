/* ── Hamburger toggle & Scroll Lock ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
    document.documentElement.classList.toggle('no-scroll');
  });

  document.querySelectorAll('.mobile-nav-links a:not(.mobile-dropdown-trigger)').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    });
  });
}

/* ── Desktop "Others" Dropdown ── */
const othersToggle = document.getElementById('othersToggle');
const othersParent = othersToggle ? othersToggle.closest('.dropdown-parent') : null;

if (othersToggle && othersParent) {
  othersToggle.addEventListener('click', (e) => {
    e.preventDefault();
    othersParent.classList.toggle('open');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!othersParent.contains(e.target)) {
      othersParent.classList.remove('open');
    }
  });
}

/* ── Mobile "Others" Dropdown ── */
const mobileOthersToggle = document.getElementById('mobileOthersToggle');
const mobileOthersParent = mobileOthersToggle ? mobileOthersToggle.closest('.mobile-dropdown-parent') : null;

if (mobileOthersToggle && mobileOthersParent) {
  mobileOthersToggle.addEventListener('click', (e) => {
    e.preventDefault();
    mobileOthersParent.classList.toggle('open');
  });
}

/* ── Hero Image Slideshow ── */
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('slidePrev');
const nextBtn = document.getElementById('slideNext');

let currentSlide = 0;
let slideTimer = null;

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function startAutoplay() {
  stopAutoplay();
  slideTimer = setInterval(nextSlide, 5000);
}
function stopAutoplay() {
  if (slideTimer) clearInterval(slideTimer);
}

if (slides.length > 0) {
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.index));
      startAutoplay();
    });
  });

  startAutoplay();
}

/* ── Scroll reveal ── */
const reveals = document.querySelectorAll('.reveal');
if (reveals.length > 0) {
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  reveals.forEach(el => revealObs.observe(el));
}

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
    } else if (href && href.startsWith('#')) {
      a.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', setActive, { passive: true });
setActive();