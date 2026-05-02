/* ============================================================
   posts.js — moribund-murdoch-blogger-theme
   - Popular posts grid flex layout
   - Hide popular posts on archive pages
   - Random post fetcher for homepage
   ============================================================ */

(function () {
  document.addEventListener('DOMContentLoaded', function () {

    // === POPULAR POSTS GRID ===
    const postsList = document.querySelector('.popular-posts-list');
    if (postsList) {
      postsList.style.display = 'flex';
      postsList.style.flexWrap = 'wrap';
      postsList.querySelectorAll('.grid-item').forEach(post => {
        post.style.flex = '0 0 50%';
        post.style.boxSizing = 'border-box';
      });
    }

    // === HIDE POPULAR POSTS ON ARCHIVE PAGES ===
    const popularPosts = document.querySelector('.popular-posts-container');
    if (/\/\d{4}\/\d{2}\//.test(window.location.pathname) && popularPosts) {
      popularPosts.style.display = 'none';
    }

    // === RANDOM POST (homepage only) ===
    const isHome =
      window.location.pathname === '/' ||
      window.location.pathname === '/index.html';

    const randomPostContainer = document.querySelector('.random-post');

    if (isHome && randomPostContainer) {
      fetch('/feeds/posts/default?alt=json&max-results=100')
        .then(res => res.json())
        .then(data => {
          const posts = data.feed.entry;
          if (!posts || posts.length === 0) {
            randomPostContainer.innerHTML = '<p>No posts available.</p>';
            return;
          }
          const post = posts[Math.floor(Math.random() * posts.length)];
          const title = post.title.$t;
          const url = post.link.find(l => l.rel === 'alternate').href;
          const content = post.content ? post.content.$t : (post.summary ? post.summary.$t : '');
          randomPostContainer.innerHTML = `
            <h2><a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a></h2>
            <div>${content}</div>
          `;
        })
        .catch(err => {
          console.warn('posts.js: could not fetch random post', err);
          randomPostContainer.innerHTML = '<p>Error fetching post.</p>';
        });
    } else if (randomPostContainer) {
      randomPostContainer.style.display = 'none';
    }

  });
})();
