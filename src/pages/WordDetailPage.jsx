import { ArrowLeft } from "lucide-react";

const LEVEL_LABELS = {
  basic: "Level1",
  intermediate: "Level2",
  advanced: "Level3"
};

function WordDetailPage({ word, onBack }) {
  return (
    <main className="screen detail-screen">
      <header className="page-header">
        <button className="icon-button" type="button" onClick={onBack} aria-label="戻る">
          <ArrowLeft size={24} aria-hidden="true" />
        </button>
        <div>
          <p className="eyebrow">Dictionary detail</p>
          <h1>単語詳細</h1>
        </div>
      </header>

      <article className="word-detail">
        <div className="badge-row">
          <span className={`category category-${word.category.toLowerCase()}`}>
            {word.category}
          </span>
          <span className={`level level-${word.level}`}>{LEVEL_LABELS[word.level]}</span>
        </div>

        <section className="detail-block">
          <p className="detail-label">単語</p>
          <h2>{word.term}</h2>
        </section>

        <section className="detail-block">
          <p className="detail-label">意味</p>
          <p className="detail-short-meaning">{word.shortMeaning}</p>
        </section>

        <section className="detail-block">
          <p className="detail-label">説明</p>
          <p className="detail-meaning">{word.meaning}</p>
        </section>
      </article>
    </main>
  );
}

export default WordDetailPage;
