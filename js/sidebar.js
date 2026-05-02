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
