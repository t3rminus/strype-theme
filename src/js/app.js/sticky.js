(function() {
  document.addEventListener('init', () => {
    const el = document.querySelector('.header').parentElement;
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle('is-stuck', e.intersectionRatio < 1),
      { threshold: [1] }
    );

    observer.observe(el);
  });
}());