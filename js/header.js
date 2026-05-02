
/* ============================================================
   header.js — moribund-murdoch-blogger-theme
   Behaviour for the blog header:
     - Bell dropdown toggle
     - Click outside to close dropdown
     - Redirect dropdown to latest post URL
     - Search autocomplete from blog feed
   ============================================================ */

(function () {
  document.addEventListener('DOMContentLoaded', function () {

    // === BELL DROPDOWN ===
    const bellIcon = document.querySelector('.bell-icon');
    const dropdown = document.querySelector('.dropdown-menu');

    function openDropdown()  { if (dropdown) dropdown.classList.add('active'); }
    function closeDropdown() { if (dropdown) dropdown.classList.remove('active'); }
    function toggleDropdown() {
      if (dropdown) dropdown.classList.toggle('active');
    }

    if (bellIcon) {
      bellIcon.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleDropdown();
      });
    }

    document.addEventListener('click', function (e) {
      if (dropdown && !dropdown.contains(e.target) && e.target !== bellIcon) {
        closeDropdown();
      }
    });

    // === REDIRECT DROPDOWN TO LATEST POST ===
    fetch('/feeds/posts/default?alt=json&max-results=1')
      .then(res => res.json())
      .then(data => {
        const entry = data.feed.entry[0];
        const latestUrl = entry.link.find(l => l.rel === 'alternate').href;

        // Make the post summary clickable
        const postSummary = document.querySelector('.post-summary');
        if (postSummary) {
          postSummary.style.cursor = 'pointer';
          postSummary.addEventListener('click', () => window.location.href = latestUrl);
        }

        // Make the featured post title clickable
        const featuredTitle = document.querySelector('#FeaturedPost1 .title a');
        if (featuredTitle) featuredTitle.setAttribute('href', latestUrl);
      })
      .catch(err => console.warn('header.js: could not fetch latest post', err));

    // === SEARCH AUTOCOMPLETE ===
    const searchInput = document.getElementById('search-input');

    function closeAllLists() {
      document.querySelectorAll('.autocomplete-items').forEach(el => el.remove());
    }

    function displaySuggestions(suggestions) {
      closeAllLists();
      if (!suggestions.length) return;

      const list = document.createElement('div');
      list.className = 'autocomplete-items';
      searchInput.parentNode.style.position = 'relative';
      searchInput.parentNode.appendChild(list);

      suggestions.forEach(title => {
        const item = document.createElement('div');
        item.textContent = title;
        item.addEventListener('click', function () {
          searchInput.value = title;
          closeAllLists();
        });
        list.appendChild(item);
      });
    }

    function fetchSuggestions(query) {
      fetch('/feeds/posts/default?alt=json&max-results=100')
        .then(res => res.json())
        .then(data => {
          const titles = (data.feed.entry || []).map(e => e.title.$t);
          const matches = titles.filter(t => t.toLowerCase().includes(query.toLowerCase()));
          displaySuggestions(matches.slice(0, 8));
        })
        .catch(err => console.warn('header.js: autocomplete fetch failed', err));
    }

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        const query = this.value.trim();
        if (!query) return closeAllLists();
        fetchSuggestions(query);
      });

      document.addEventListener('click', function (e) {
        if (e.target !== searchInput) closeAllLists();
      });
    }

  });
})();