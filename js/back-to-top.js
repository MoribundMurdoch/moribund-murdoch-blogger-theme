/* ============================================================
   back-to-top.js — moribund-murdoch-blogger-theme
   - Smooth scroll to top
   - Show/hide fixed back-to-top button on scroll
   ============================================================ */

(function () {
  document.addEventListener('DOMContentLoaded', function () {

    const backToTopFixed = document.getElementById('back-to-top-fixed');
    const backToTop      = document.getElementById('back-to-top');

    function scrollToTop(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (backToTopFixed) backToTopFixed.addEventListener('click', scrollToTop);
    if (backToTop)      backToTop.addEventListener('click', scrollToTop);

    // Show the fixed button only after scrolling down 100px
    window.addEventListener('scroll', function () {
      if (backToTopFixed) {
        backToTopFixed.style.display = window.pageYOffset > 100 ? 'block' : 'none';
      }
    });

  });
})();
