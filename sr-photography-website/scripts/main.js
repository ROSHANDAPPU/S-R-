// S&R Illusions - Client Welcome Packet
// scripts/main.js

(function () {
  const navDots = Array.from(document.querySelectorAll('.nav-dot'));
  const slides = Array.from(document.querySelectorAll('.slide'));
  const main = document.querySelector('main');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  // Helper: smooth scroll to a slide index
  function scrollToSlide(index) {
    const target = document.getElementById(`slide-${index}`);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Update active dot based on current slide
  function setActiveDot(index) {
    navDots.forEach((dot, i) => {
      const isActive = i === index;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  // Click handlers for nav dots
  navDots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const index = parseInt(dot.getAttribute('data-slide'), 10);
      scrollToSlide(index);
      hideScrollIndicator();
    });
  });

  // Track active slide using IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id; // e.g., slide-3
          const index = parseInt(id.split('-')[1], 10);
          setActiveDot(index);
          // Trigger reveal animations inside this slide
          entry.target.querySelectorAll('.reveal').forEach((el) => {
            el.classList.add('in');
          });
        } else {
          // Remove to allow re-animating when coming back to the slide
          entry.target.querySelectorAll('.reveal').forEach((el) => {
            el.classList.remove('in');
          });
        }
      });
    },
    { root: null, threshold: 0.4 }
  );

  slides.forEach((slide) => observer.observe(slide));

  // Hide scroll indicator after first interaction
  function hideScrollIndicator() {
    if (!scrollIndicator) return;
    scrollIndicator.style.opacity = '0';
    scrollIndicator.style.transition = 'opacity 300ms ease';
    setTimeout(() => {
      if (scrollIndicator) scrollIndicator.style.display = 'none';
    }, 350);
  }

  // Hide after scroll or key interaction
  let hasInteracted = false;
  function onFirstInteraction() {
    if (hasInteracted) return;
    hasInteracted = true;
    hideScrollIndicator();
  }
  window.addEventListener('wheel', onFirstInteraction, { passive: true });
  window.addEventListener('touchstart', onFirstInteraction, { passive: true });

  // Keyboard navigation for accessibility
  document.addEventListener('keydown', (e) => {
    const activeIndex = navDots.findIndex((d) => d.classList.contains('active'));
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      const next = Math.min(slides.length - 1, activeIndex + 1);
      scrollToSlide(next);
      onFirstInteraction();
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      const prev = Math.max(0, activeIndex - 1);
      scrollToSlide(prev);
      onFirstInteraction();
    } else if (e.key === 'Home') {
      scrollToSlide(0);
    } else if (e.key === 'End') {
      scrollToSlide(slides.length - 1);
    }
  });

  // Focus management for nav dots (optional UX)
  document.querySelector('.nav-dots')?.addEventListener('keydown', (e) => {
    const current = document.activeElement;
    const idx = navDots.indexOf(current);
    if (idx === -1) return;
    if (e.key === 'ArrowDown') {
      const next = navDots[Math.min(navDots.length - 1, idx + 1)];
      next.focus();
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      const prev = navDots[Math.max(0, idx - 1)];
      prev.focus();
      e.preventDefault();
    } else if (e.key === 'Enter' || e.key === ' ') {
      current.click();
      e.preventDefault();
    }
  });

  // Ultra-smooth paged scrolling (trackpad/mouse wheel) with low threshold
  // Respects prefers-reduced-motion: skips animation lock and prevents default less aggressively
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let isAnimating = false;
  let wheelAccum = 0;
  const WHEEL_THRESHOLD = 20; // low threshold so very small gestures advance slides
  const LOCK_MS = prefersReduced ? 200 : 650; // short lock to prevent overshoot

  function currentIndex() {
    const idx = navDots.findIndex((d) => d.classList.contains('active'));
    return Math.max(0, idx);
  }

  function navigateBy(delta) {
    if (isAnimating) return;
    const idx = currentIndex();
    const dir = delta > 0 ? 1 : -1;
    const target = Math.min(slides.length - 1, Math.max(0, idx + dir));
    if (target === idx) return;
    isAnimating = true;
    scrollToSlide(target);
    setTimeout(() => { isAnimating = false; }, LOCK_MS);
  }

  window.addEventListener('wheel', (e) => {
    // On some browsers, passive is true by default; explicitly prevent default for controlled paging
    // Only do aggressive paging when not holding modifier keys
    if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
    // Accumulate and trigger once threshold met
    wheelAccum += e.deltaY;
    if (Math.abs(wheelAccum) >= WHEEL_THRESHOLD) {
      e.preventDefault?.();
      navigateBy(wheelAccum);
      wheelAccum = 0;
      onFirstInteraction();
    }
  }, { passive: false });

  // Touch swipe support with small threshold for easy paging
  let touchStartY = null;
  const TOUCH_THRESHOLD = 24; // small swipe to trigger
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (touchStartY == null) return;
    const dy = touchStartY - e.touches[0].clientY; // positive when swiping up
    if (Math.abs(dy) > TOUCH_THRESHOLD && !isAnimating) {
      navigateBy(dy);
      touchStartY = null;
      onFirstInteraction();
    }
  }, { passive: true });
  window.addEventListener('touchend', () => { touchStartY = null; }, { passive: true });
})();
