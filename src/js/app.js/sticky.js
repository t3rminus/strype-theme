(function() {
  document.addEventListener('init', function() {
    var el = document.querySelector('.header').parentElement;
    var observer = new IntersectionObserver(
      function(e) { e[0].target.classList.toggle('is-stuck', e[0].intersectionRatio < 1) },
      { threshold: [1] }
    );

    observer.observe(el);
  });
}());