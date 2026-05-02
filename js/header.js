/* ============================================================
   header.js — moribund-murdoch-blogger-theme
   - Bell dropdown toggle
   - Click outside to close
   - Redirect dropdown to latest post
   - Search autocomplete from current blog feed
   ============================================================ */

(function () {
  document.addEventListener('DOMContentLoaded', function () {

    // === BELL DROPDOWN ===
    const bellIcon = document.querySelector('.bell-icon');
    const dropdown = document.querySelector('.dropdown-menu');

    if (bellIcon) {
      bellIcon.addEventListener('click', function (e) {
        e.stopPropagation();
        if (dropdown) dropdown.classList.toggle('active');
      });
    }

    document.addEventListener('click', function (e) {
      if (dropdown && !dropdown.contains(e.target) && e.target !== bellIcon) {
        dropdown.classList.remove('active');
      }
    });

    // === REDIRECT DROPDOWN TO LATEST POST ===
    fetch('/feeds/posts/default?alt=json&max-results=1')
      .then(res => res.json())
      .then(data => {
        const entry = data.feed.entry[0];
        const latestUrl = entry.link.find(l => l.rel === 'alternate').href;

        const postSummary = document.querySelector('.post-summary');
        if (postSummary) {
          postSummary.style.cursor = 'pointer';
          postSummary.addEventListener('click', () => window.location.href = latestUrl);
        }

        const featuredTitle = document.querySelector('#FeaturedPost1 .title a');
        if (featuredTitle) featuredTitle.setAttribute('href', latestUrl);

        const dropdownLink = document.querySelector(".dropdown-menu a[href='']");
        if (dropdownLink) dropdownLink.setAttribute('href', latestUrl);
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

      suggestions.slice(0, 8).forEach(title => {
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
      // Fetches from the current blog — no hardcoded URL
      fetch('/feeds/posts/default?alt=json&max-results=100')
        .then(res => res.json())
        .then(data => {
          const titles = (data.feed.entry || []).map(e => e.title.$t);
          const matches = titles.filter(t => t.toLowerCase().includes(query.toLowerCase()));
          displaySuggestions(matches);
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
