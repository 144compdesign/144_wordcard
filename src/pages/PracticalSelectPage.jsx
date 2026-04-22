import { ArrowLeft, BriefcaseBusiness, Monitor } from "lucide-react";
import words from "../data/words.json";

const PRACTICAL_CATEGORIES = [
  {
    name: "Tech",
    label: "Tech",
    description: "デザイン・Web系",
    Icon: Monitor
  },
  {
    name: "Business",
    label: "Business",
    description: "仕事系",
    Icon: BriefcaseBusiness
  }
];

function countWords(category) {
  return words.filter((word) => word.category === category).length;
}

function PracticalSelectPage({ onBack, onSelectCategory }) {
  return (
    <main className="screen level-screen">
      <header className="page-header">
        <button className="icon-button" type="button" onClick={onBack} aria-label="戻る">
          <ArrowLeft size={24} aria-hidden="true" />
        </button>
        <div>
          <p className="eyebrow">Practical words</p>
          <h1>実務用語</h1>
        </div>
      </header>

      <section className="level-list" aria-label="実務用語カテゴリの選択">
        {PRACTICAL_CATEGORIES.map(({ name, label, description, Icon }) => (
          <button
            className="practical-select-button"
            type="button"
            key={name}
            onClick={() => onSelectCategory(name)}
          >
            <Icon size={24} aria-hidden="true" />
            <span className="practical-select-main">
              <span>{label}</span>
              <small>
                {description} / {countWords(name)}問
              </small>
            </span>
          </button>
        ))}
      </section>
    </main>
  );
}

export default PracticalSelectPage;
