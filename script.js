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
});
