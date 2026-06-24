document.addEventListener('DOMContentLoaded', function() {
  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function smoothScrollTo(target, duration = 1000) {
    const start = window.pageYOffset;
    const targetTop = target.getBoundingClientRect().top;
    const distance = targetTop;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = Math.min((currentTime - startTime) / duration, 1);
      const progress = easeOutQuart(elapsed);
      window.scrollTo(0, start + distance * progress);
      if (elapsed < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }

  // Close menu on link click
  const navLinks = document.querySelectorAll('#mobileMenu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (hamburger) hamburger.classList.remove('active');
      if (mobileMenu) mobileMenu.classList.remove('active');
    });
  });

  // Smooth scroll for all anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(event) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        smoothScrollTo(target, 900);
      }
    });
  });

  // Carousel navigation with auto-scroll
  const gallery = document.getElementById('gallery');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (gallery && prevBtn && nextBtn) {
    const cards = gallery.querySelectorAll('.card');
    let currentIndex = 0;
    let autoScrollInterval;

    function scrollToCard(index) {
      if (cards.length === 0) return;
      currentIndex = (index + cards.length) % cards.length;
      const card = cards[currentIndex];
      gallery.scrollTo({
        left: card.offsetLeft - 16,
        behavior: 'smooth'
      });
    }

    function startAutoScroll() {
      autoScrollInterval = setInterval(() => {
        scrollToCard(currentIndex + 1);
      }, 3000);
    }

    function resetAutoScroll() {
      clearInterval(autoScrollInterval);
      startAutoScroll();
    }

    prevBtn.addEventListener('click', () => {
      scrollToCard(currentIndex - 1);
      resetAutoScroll();
    });
    nextBtn.addEventListener('click', () => {
      scrollToCard(currentIndex + 1);
      resetAutoScroll();
    });

    // Start auto-scroll on load
    startAutoScroll();
  }
});
