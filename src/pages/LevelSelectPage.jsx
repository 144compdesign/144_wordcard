import { ArrowLeft, Braces, Code2, Layers, Palette } from "lucide-react";
import words from "../data/words.json";

const LEVELS = [
  {
    label: "Level1",
    level: "basic",
    description: "基本として覚えるもの"
  },
  {
    label: "Level2",
    level: "intermediate",
    description: "使用頻度の高いもの"
  },
  {
    label: "Level3",
    level: "advanced",
    description: "実践的に使うもの"
  }
];

const CATEGORY_GROUPS = [
  { name: "HTML", Icon: Code2 },
  { name: "CSS", Icon: Palette },
  { name: "JavaScript", Icon: Braces }
];

function countWords(category, level) {
  return words.filter((word) => {
    return word.category === category && word.level === level;
  }).length;
}

function LevelSelectPage({ onBack, onSelectFilter }) {
  return (
    <main className="screen level-screen">
      <header className="page-header">
        <button className="icon-button" type="button" onClick={onBack} aria-label="戻る">
          <ArrowLeft size={24} aria-hidden="true" />
        </button>
        <div>
          <p className="eyebrow">Choose deck</p>
          <h1>単語を見る</h1>
        </div>
      </header>

      <section className="level-list" aria-label="学習する単語の選択">
        {CATEGORY_GROUPS.map(({ name, Icon }) => (
          <section className="level-group" key={name}>
            <h2>
              <Icon size={20} aria-hidden="true" />
              {name}
            </h2>

            <div className="level-buttons">
              {LEVELS.map((levelItem) => (
                <button
                  className="level-select-button"
                  type="button"
                  key={`${name}-${levelItem.level}`}
                  onClick={() =>
                    onSelectFilter({
                      category: name,
                      level: levelItem.level,
                      title: `${name} ${levelItem.label}`,
                      description: levelItem.description
                    })
                  }
                >
                  <span>{levelItem.label}</span>
                  <small>
                    {levelItem.description} / {countWords(name, levelItem.level)}問
                  </small>
                </button>
              ))}
            </div>
          </section>
        ))}

        <button
          className="all-words-button"
          type="button"
          onClick={() =>
            onSelectFilter({
              category: "all",
              level: "all",
              title: "全て",
              description: "200問すべて"
            })
          }
        >
          <Layers size={22} aria-hidden="true" />
          <span>全て</span>
          <small>{words.length}問</small>
        </button>
      </section>
    </main>
  );
}

export default LevelSelectPage;
