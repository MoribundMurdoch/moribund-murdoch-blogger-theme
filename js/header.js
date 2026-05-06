/* ============================================================
   header.js — moribund-murdoch-blogger-theme
   - Bell dropdown toggle
   - Click outside to close
   - Redirect dropdown to latest post
   - Search autocomplete from current blog feed
   - Mobile search expand/collapse toggle
   - Mobile title truncation
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
    const searchForm  = searchInput ? searchInput.closest('form') : null;

    let postCache     = null;
    let debounceTimer = null;
    let activeIndex   = -1;

    function closeAllLists() {
      document.querySelectorAll('.autocomplete-items').forEach(el => el.remove());
      activeIndex = -1;
    }

    function getItems() {
      return document.querySelectorAll('.autocomplete-items div');
    }

    function setActive(items, index) {
      items.forEach(el => el.classList.remove('autocomplete-active'));
      if (index >= 0 && index < items.length) {
        items[index].classList.add('autocomplete-active');
        searchInput.value = items[index].dataset.value;
      }
    }

    function displaySuggestions(suggestions, query) {
      closeAllLists();
      if (!suggestions.length) return;

      const list = document.createElement('div');
      list.className = 'autocomplete-items';

      const wrapper = searchInput.closest('.search-bar') || searchInput.parentNode;
      wrapper.style.position = 'relative';
      wrapper.appendChild(list);

      suggestions.slice(0, 8).forEach(title => {
        const item = document.createElement('div');
        item.dataset.value = title;

        const matchIndex = title.toLowerCase().indexOf(query.toLowerCase());
        if (matchIndex !== -1) {
          item.innerHTML =
            title.slice(0, matchIndex) +
            '<strong>' + title.slice(matchIndex, matchIndex + query.length) + '</strong>' +
            title.slice(matchIndex + query.length);
        } else {
          item.textContent = title;
        }

        item.addEventListener('mousedown', function (e) {
          e.preventDefault();
          searchInput.value = this.dataset.value;
          closeAllLists();
          if (searchForm) searchForm.submit();
        });

        list.appendChild(item);
      });
    }

    function fetchAndFilter(query) {
      if (postCache) {
        const matches = postCache.filter(t =>
          t.toLowerCase().includes(query.toLowerCase())
        );
        displaySuggestions(matches, query);
        return;
      }

      fetch('/feeds/posts/default?alt=json&max-results=500')
        .then(res => res.json())
        .then(data => {
          postCache = (data.feed.entry || []).map(e => e.title.$t);
          const matches = postCache.filter(t =>
            t.toLowerCase().includes(query.toLowerCase())
          );
          displaySuggestions(matches, query);
        })
        .catch(err => console.warn('header.js: autocomplete fetch failed', err));
    }

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        const query = this.value.trim();
        if (!query) return closeAllLists();
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => fetchAndFilter(query), 200);
      });

      searchInput.addEventListener('keydown', function (e) {
        const items = getItems();
        if (!items.length) return;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          activeIndex = Math.min(activeIndex + 1, items.length - 1);
          setActive(items, activeIndex);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          activeIndex = Math.max(activeIndex - 1, 0);
          setActive(items, activeIndex);
        } else if (e.key === 'Enter') {
          if (activeIndex > -1 && items[activeIndex]) {
            e.preventDefault();
            searchInput.value = items[activeIndex].dataset.value;
            closeAllLists();
            if (searchForm) searchForm.submit();
          }
        } else if (e.key === 'Escape') {
          closeAllLists();
        }
      });

      document.addEventListener('click', function (e) {
        if (e.target !== searchInput) closeAllLists();
      });

      searchInput.addEventListener('focus', function () {
        if (!postCache) {
          fetch('/feeds/posts/default?alt=json&max-results=500')
            .then(res => res.json())
            .then(data => {
              postCache = (data.feed.entry || []).map(e => e.title.$t);
            })
            .catch(() => {});
        }
      });
    }

    // === MOBILE SEARCH TOGGLE ===
    const header          = document.querySelector('.header');
    const searchContainer = document.querySelector('.search-container');
    const bellContainer   = document.querySelector('.bell-container');

    if (header && searchContainer) {
      const toggle = document.createElement('button');
      toggle.classList.add('search-toggle');
      toggle.setAttribute('aria-label', 'Toggle search');
      toggle.innerHTML = '&#128269;';

      if (bellContainer) {
        header.insertBefore(toggle, bellContainer);
      } else {
        header.appendChild(toggle);
      }

      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = searchContainer.classList.toggle('open');
        if (isOpen) {
          const input = searchContainer.querySelector('input');
          if (input) input.focus();
        } else {
          closeAllLists();
        }
      });

      document.addEventListener('click', function (e) {
        if (
          !searchContainer.contains(e.target) &&
          e.target !== toggle
        ) {
          searchContainer.classList.remove('open');
          closeAllLists();
        }
      });
    }

    // === MOBILE TITLE TRUNCATION ===
    const title = document.querySelector('.glowing-title');
    if (title) {
      const full  = title.textContent.trim();
      const short = 'MorMurdoch';

      function updateTitle() {
        title.textContent = window.innerWidth <= 640 ? short : full;
      }

      updateTitle();
      window.addEventListener('resize', updateTitle);
    }

  });
})();