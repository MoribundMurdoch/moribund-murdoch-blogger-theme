/* ============================================================
   sidebar.js — moribund-murdoch-blogger-theme
   - Mobile sidebar open/close toggle
   - Randomised label display (shows a random subset on each visit)
   ============================================================ */

(function () {
  document.addEventListener('DOMContentLoaded', function () {

    // === MOBILE SIDEBAR TOGGLE ===
    const sidebar    = document.querySelector('.sidebar');
    const sidebarIcon = document.querySelector('.sidebar-icon');

    if (sidebarIcon && sidebar) {
      sidebarIcon.addEventListener('click', function () {
        sidebar.classList.toggle('open');
      });

      document.addEventListener('click', function (e) {
        if (sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) &&
            e.target !== sidebarIcon) {
          sidebar.classList.remove('open');
        }
      });
    }

    // === RANDOMISE LABELS ===
    // Shows a random selection of labels on each page load.
    // Change MAX_LABELS to control how many are shown at once.
    const MAX_LABELS = 12;

    const labelItems = document.querySelectorAll(
      '.widget-content.list-label-widget-content li'
    );

    if (labelItems.length > 0) {
      const all = Array.from(labelItems);

      // Fisher-Yates shuffle
      for (let i = all.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [all[i], all[j]] = [all[j], all[i]];
      }

      // Show only the first MAX_LABELS items, hide the rest
      all.forEach((item, index) => {
        item.style.display = index < MAX_LABELS ? '' : 'none';
      });
    }

  });
})();
