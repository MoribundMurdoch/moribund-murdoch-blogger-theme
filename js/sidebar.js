/* ============================================================
   sidebar.js — moribund-murdoch-blogger-theme
   - Mobile sidebar open/close toggle
   - Move sidebar icon into header on mobile
   - Randomised label display
   ============================================================ */

(function () {
  document.addEventListener('DOMContentLoaded', function () {

    const sidebar     = document.querySelector('.sidebar');
    const sidebarIcon = document.querySelector('.sidebar-icon');
    const header      = document.querySelector('.header');

    // === MOVE ICON INTO HEADER ON MOBILE ===
    // The sidebar-icon lives in .content-wrapper in the HTML,
    // but needs to be the first child of .header on mobile.
    function moveIcon() {
      if (!sidebarIcon || !header) return;
      if (window.innerWidth <= 1156) {
        if (sidebarIcon.parentElement !== header) {
          header.insertBefore(sidebarIcon, header.firstChild);
        }
      }
    }

    moveIcon();
    window.addEventListener('resize', moveIcon);

    // === MOBILE SIDEBAR TOGGLE ===
    if (sidebarIcon && sidebar) {
      sidebarIcon.addEventListener('click', function (e) {
        e.stopPropagation();
        sidebar.classList.toggle('open');
      });

      document.addEventListener('click', function (e) {
        if (
          sidebar.classList.contains('open') &&
          !sidebar.contains(e.target) &&
          e.target !== sidebarIcon
        ) {
          sidebar.classList.remove('open');
        }
      });
    }

    // === RANDOMISE LABELS ===
    const MAX_LABELS = 12;
    const labelItems = document.querySelectorAll(
      '.widget-content.list-label-widget-content li'
    );

    if (labelItems.length > 0) {
      const all = Array.from(labelItems);
      for (let i = all.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [all[i], all[j]] = [all[j], all[i]];
      }
      all.forEach((item, index) => {
        item.style.display = index < MAX_LABELS ? '' : 'none';
      });
    }

  });
})();