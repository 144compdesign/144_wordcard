import { useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import words from "../data/words.json";

const LEVEL_LABELS = {
  basic: "Level1",
  intermediate: "Level2",
  advanced: "Level3"
};

const CATEGORY_ORDER = {
  HTML: 1,
  CSS: 2,
  JavaScript: 3
};

const CATEGORY_FILTERS = ["HTML", "CSS", "JavaScript"];

const sortedWords = [...words].sort((firstWord, secondWord) => {
  const categoryDiff =
    CATEGORY_ORDER[firstWord.category] - CATEGORY_ORDER[secondWord.category];

  if (categoryDiff !== 0) {
    return categoryDiff;
  }

  return firstWord.term.localeCompare(secondWord.term, "en", {
    sensitivity: "base"
  });
});

function DictionaryPage({ onBack, onSelectWord }) {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredWords = sortedWords.filter((word) => {
    const normalizedSearchText = searchText.trim().toLowerCase();
    const searchableText = `${word.term} ${word.shortMeaning} ${word.meaning}`.toLowerCase();
    const matchesSearch =
      normalizedSearchText === "" || searchableText.includes(normalizedSearchText);
    const matchesCategory =
      selectedCategory === "all" || word.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="screen dictionary-screen">
      <header className="page-header">
        <button className="icon-button" type="button" onClick={onBack} aria-label="戻る">
          <ArrowLeft size={24} aria-hidden="true" />
        </button>
        <div>
          <p className="eyebrow">{words.length} words</p>
          <h1>辞典</h1>
        </div>
      </header>

      <section className="dictionary-tools" aria-label="辞典の検索と絞り込み">
        <label className="search-label" htmlFor="word-search">
          検索
        </label>
        <input
          id="word-search"
          className="search-input"
          type="search"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="単語・意味・説明を検索"
        />

        <div className="filter-buttons" aria-label="カテゴリフィルタ">
          <button
            className={`filter-button ${selectedCategory === "all" ? "is-active" : ""}`}
            type="button"
            onClick={() => setSelectedCategory("all")}
          >
            全て
          </button>
          {CATEGORY_FILTERS.map((category) => (
            <button
              className={`filter-button ${
                selectedCategory === category ? "is-active" : ""
              }`}
              type="button"
              key={category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="word-list" aria-label="単語一覧">
        {filteredWords.map((word) => (
          <button
            className="word-list-item"
            type="button"
            key={word.id}
            onClick={() => onSelectWord(word)}
          >
            <span className="word-list-main">
              <span className="word-list-term">{word.term}</span>
              <span className="word-list-meaning">{word.shortMeaning}</span>
            </span>
            <span className="word-list-meta">
              <span className={`category category-${word.category.toLowerCase()}`}>
                {word.category}
              </span>
              <span className={`level level-${word.level}`}>
                {LEVEL_LABELS[word.level]}
              </span>
            </span>
            <ChevronRight className="word-list-arrow" size={20} aria-hidden="true" />
          </button>
        ))}
      </section>

      {filteredWords.length === 0 && (
        <p className="dictionary-empty">該当する単語がありません。</p>
      )}
    </main>
  );
}

export default DictionaryPage;
