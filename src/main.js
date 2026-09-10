import './style.css';

// ── Hero photo slideshow ──
const heroSlides = document.querySelectorAll('.hero__slide');
if (heroSlides.length > 1) {
  let currentSlide = 0;
  setInterval(() => {
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
  }, 4000);
}

// ── Smooth-scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Scroll-reveal animation ──
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document
  .querySelectorAll(
    '.section__title, .section__subtitle, .project-card, .cert-card, .skill-icon, .experience__card, .skills__group'
  )
  .forEach((el) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

// ── Interactive copy feature for contact items ──
const contactButtons = document.querySelectorAll('.hero__contact-item');

contactButtons.forEach((btn) => {
  const copyText = btn.getAttribute('data-copy');
  const label = btn.querySelector('.hero__badge-label');
  const icon = btn.querySelector('.hero__contact-badge i');
  let resetTimer;

  const handleCopy = async () => {
    if (!copyText) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(copyText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = copyText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      clearTimeout(resetTimer);
      btn.classList.add('copied');
      if (label) label.textContent = 'Copied!';
      if (icon) icon.className = 'bx bx-check';

      resetTimer = setTimeout(() => {
        btn.classList.remove('copied');
        if (label) label.textContent = 'Copy';
        if (icon) icon.className = 'bx bx-copy';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy contact info:', err);
    }
  };

  btn.addEventListener('click', handleCopy);
});
