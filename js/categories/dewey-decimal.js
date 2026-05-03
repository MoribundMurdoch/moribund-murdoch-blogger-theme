/**
 * <mor-dewey-decimal>
 *
 * Renders the full Dewey Decimal classification index for MoribundMurdoch,
 * linking each tag to its Blogger label search page.
 *
 * Usage:
 *   <mor-dewey-decimal></mor-dewey-decimal>
 *
 * Light DOM — inherits styles from base.css and the page stylesheet.
 */

const DEWEY_DATA = [
  {
    id:    'dewey-000',
    code:  '000',
    title: 'General Works',
    sections: [
      {
        label: null,
        tags: [
          'Encyclopedias', 'Curiosities', 'Bibliographies',
          'Libraries', 'Databases', 'Journalism',
          'Internet Culture', 'AI', 'Meta'
        ]
      }
    ]
  },
  {
    id:    'dewey-100',
    code:  '100',
    title: 'Philosophy & Psychology',
    sections: [
      {
        label: 'Branches',
        tags: [
          'Metaphysics', 'Epistemology', 'Logic', 'Ethics',
          'Aesthetics', 'Philosophy of Mind', 'Philosophy of Language',
          'Political Philosophy'
        ]
      },
      {
        label: 'Schools & Ideas',
        tags: [
          'Epicureanism', 'Deontology', 'Existentialism', 'Stoicism',
          'Nietzsche', 'Memento Mori', 'Finitude'
        ]
      },
      {
        label: 'Psychology',
        tags: [
          'Psychology', 'Cognitive Science', 'Behaviorism',
          'Skinner Box', 'Memory', 'Hypochondria'
        ]
      }
    ]
  },
  {
    id:    'dewey-200',
    code:  '200',
    title: 'Religion',
    sections: [
      {
        label: 'Topics',
        tags: [
          'Theology', 'Mythology', 'Philosophy of Religion',
          'Eschatology', 'Mysticism', 'Sacred Texts'
        ]
      },
      {
        label: 'World Religions',
        tags: [
          'Buddhism', 'Christianity', 'Hinduism', 'Islam', 'Judaism',
          'Sikhism', 'Taoism', 'Confucianism', 'Shinto',
          'Baháʼí Faith', 'Jainism', 'Zoroastrianism'
        ]
      }
    ]
  },
  {
    id:    'dewey-300',
    code:  '300',
    title: 'Social Sciences',
    sections: [
      {
        label: 'Governance & Society',
        tags: [
          'Politics', 'Sociology', 'Economics', 'Law',
          'Democracy', 'Voluntary Associations', 'Mutual Aid', 'Tocqueville'
        ]
      },
      {
        label: 'Education & Development',
        tags: [
          'Education', 'Foster Care', 'Entrepreneurship',
          'Child Development', 'Self-Development', 'Charities'
        ]
      },
      {
        label: 'Culture & Customs',
        tags: ['Folklore', 'Customs', 'Gender', 'Commerce']
      }
    ]
  },
  {
    id:    'dewey-400',
    code:  '400',
    title: 'Language',
    sections: [
      {
        label: 'Linguistics',
        tags: [
          'Linguistics', 'Etymology', 'Lexicography', 'Grammar',
          'Rhetoric', 'Semantics', 'Phonology',
          'Historical Linguistics', 'Grammaticalization'
        ]
      },
      {
        label: 'Word Classes',
        tags: [
          'Nouns', 'Verbs', 'Adjectives', 'Adverbs',
          'Prepositions', 'Conjunctions', 'Interjections'
        ]
      },
      {
        label: 'Languages',
        tags: [
          'English', 'Latin', 'Greek', 'Swahili', 'Estonian',
          'Japanese', 'Korean', 'French', 'German', 'Arabic'
        ]
      },
      {
        label: 'Lexical Projects',
        tags: [
          'MorDictionary', 'Word of the Day',
          'WearYourDictionary', 'Vocabulary', 'Neologisms'
        ]
      }
    ]
  },
  {
    id:    'dewey-500',
    code:  '500',
    title: 'Pure Science',
    sections: [
      {
        label: 'Life Sciences',
        tags: [
          'Biology', 'Bacteriophages', 'Microbiology',
          'Ecology', 'Botany', 'Zoology'
        ]
      },
      {
        label: 'Physical Sciences',
        tags: ['Physics', 'Chemistry', 'Astronomy', 'Earth Science']
      },
      {
        label: 'Formal Sciences',
        tags: ['Mathematics', 'Logic', 'Statistics']
      }
    ]
  },
  {
    id:    'dewey-600',
    code:  '600',
    title: 'Technology',
    sections: [
      {
        label: 'Computing',
        tags: [
          'Computers', 'Linux', 'Arch Linux', 'Open Source',
          'Web Components', 'Engineering', 'Python', 'MediaWiki'
        ]
      },
      {
        label: 'Health & Medicine',
        tags: ['Medicine', 'Nutrition', 'Raw Milk', 'Raw Food', 'Fitness']
      },
      {
        label: 'Agriculture & Craft',
        tags: ['Agriculture', 'Farming', 'Cast Iron', 'Cooking', 'Steak']
      },
      {
        label: 'Arms',
        tags: ['Firearms', 'M1911']
      }
    ]
  },
  {
    id:    'dewey-700',
    code:  '700',
    title: 'Arts & Recreation',
    sections: [
      {
        label: 'Visual Arts',
        tags: [
          'Visual Art', 'Dictionary Art', 'Design',
          'Typography', 'Architecture', 'Adobe Architecture'
        ]
      },
      {
        label: 'Performing Arts & Music',
        tags: ['Music', 'Lexical Soundtrack', 'Dance', 'Film', 'Theatre']
      },
      {
        label: 'Recreation & Leisure',
        tags: [
          'Gaming', 'Anime', 'K-Drama', 'Kotatsu',
          'Twitch', 'Streaming'
        ]
      }
    ]
  },
  {
    id:    'dewey-800',
    code:  '800',
    title: 'Literature',
    sections: [
      {
        label: null,
        tags: [
          'Poetry', 'Fiction', 'Essays', 'Drama',
          'Satire', 'Rhetoric', 'Literary Criticism', 'Autobiography'
        ]
      }
    ]
  },
  {
    id:    'dewey-900',
    code:  '900',
    title: 'History & Geography',
    sections: [
      {
        label: 'History',
        tags: [
          'World History', 'African History', 'World War II',
          'Ancient History', 'Medieval History',
          'Modern History', 'History of Ideas'
        ]
      },
      {
        label: 'Biography',
        tags: ['Biography', 'Autobiography', 'MoribundMurdoch']
      },
      {
        label: 'Geography & Travel',
        tags: ['Travel', 'Estonia', 'Tallinn', 'Africa', 'Japan']
      }
    ]
  }
];

class MorDeweyDecimal extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = DEWEY_DATA.map(dewey => this.renderClass(dewey)).join('');
  }

  renderClass({ id, code, title, sections }) {
    const sectionsHTML = sections.map(s => this.renderSection(s)).join('');
    return `
      <div class="dewey-section" id="${id}">
        <h2>
          <a href="/search/label/${encodeURIComponent(code)}">${code} – ${title}</a>
        </h2>
        ${sectionsHTML}
      </div>
      <hr class="mm-divider">
    `;
  }

  renderSection({ label, tags }) {
    const sublabel = label
      ? `<p class="sub-label">${label}</p>`
      : '';
    const links = tags.map(tag => `
      <a href="/search/label/${encodeURIComponent(tag)}">${tag}</a>
    `).join('');
    return `
      ${sublabel}
      <div class="tag-grid">${links}</div>
    `;
  }
}

customElements.define('mor-dewey-decimal', MorDeweyDecimal);
