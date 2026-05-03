/**
 * <mor-by-ppti>
 *
 * Renders an A–Z label grid for any Person, Place, Thing, or Idea (PPTI)
 * category, generating compound Blogger labels like "Author: A", "Author: B".
 *
 * Attributes:
 *   keyword  — the category prefix (required).
 *              E.g. "Author", "Country", "Animal", "Religion"
 *   heading  — optional display heading. Defaults to the keyword value.
 *
 * Usage:
 *   <!-- Person -->
 *   <mor-by-ppti keyword="Author"></mor-by-ppti>
 *   <mor-by-ppti keyword="Actor"></mor-by-ppti>
 *   <mor-by-ppti keyword="Musician"></mor-by-ppti>
 *   <mor-by-ppti keyword="Philosopher"></mor-by-ppti>
 *
 *   <!-- Place -->
 *   <mor-by-ppti keyword="Country"></mor-by-ppti>
 *   <mor-by-ppti keyword="City"></mor-by-ppti>
 *
 *   <!-- Thing -->
 *   <mor-by-ppti keyword="Animal"></mor-by-ppti>
 *   <mor-by-ppti keyword="Anime"></mor-by-ppti>
 *   <mor-by-ppti keyword="Korean Drama"></mor-by-ppti>
 *
 *   <!-- Idea -->
 *   <mor-by-ppti keyword="Religion"></mor-by-ppti>
 *   <mor-by-ppti keyword="Philosophy"></mor-by-ppti>
 *   <mor-by-ppti keyword="Language"></mor-by-ppti>
 *
 * Light DOM — inherits styles from base.css and the page stylesheet.
 */

class MorByPpti extends HTMLElement {
  static get observedAttributes() {
    return ['keyword', 'heading'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const keyword = this.getAttribute('keyword');

    if (!keyword) {
      this.innerHTML = `
        <p class="sub-label" style="color:red;">
          mor-by-ppti: missing required attribute — keyword="Person, Place, Thing, or Idea"
        </p>`;
      return;
    }

    const heading  = this.getAttribute('heading') || keyword;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const links = alphabet.map(letter => {
      const label = `${keyword}: ${letter}`;
      return `<a href="/search/label/${encodeURIComponent(label)}">${letter}</a>`;
    }).join('');

    this.innerHTML = `
      <div class="dewey-section">
        <h2>${heading}</h2>
        <div class="tag-grid mm-alpha-row">${links}</div>
      </div>
      <hr class="mm-divider">
    `;
  }
}

customElements.define('mor-by-ppti', MorByPpti);
