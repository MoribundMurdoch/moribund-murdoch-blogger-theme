/* ============================================================
   sidebar.js — moribund-murdoch-blogger-theme
   - Mobile sidebar open/close toggle
   ============================================================ */

(function () {
  document.addEventListener('DOMContentLoaded', function () {

    const sidebar = document.querySelector('.sidebar');
    const sidebarIcon = document.querySelector('.sidebar-icon');

    if (sidebarIcon && sidebar) {
      sidebarIcon.addEventListener('click', function () {
        sidebar.classList.toggle('open');
      });

      // Close sidebar when clicking outside of it
      document.addEventListener('click', function (e) {
        if (sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) &&
            e.target !== sidebarIcon) {
          sidebar.classList.remove('open');
        }
      });
    }

  });
})();
// === RANDOMISE LABELS ===
const labelItems = document.querySelectorAll(
  '.widget-content.list-label-widget-content li'
);

if (labelItems.length > 0) {
  const MAX_LABELS = 12; // change this number to show more or fewer
  const all = Array.from(labelItems);

  // Shuffle
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }

  // Hide all then show only the random selection
  all.forEach((item, index) => {
    item.style.display = index < MAX_LABELS ? '' : 'none';
  });
}
