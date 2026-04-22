import { BookOpen, Flag, Library } from "lucide-react";

function StartScreen({ onStartStudy, onStartReview, onOpenDictionary }) {
  return (
    <main className="screen start-screen">
      <section className="app-title">
        <p className="eyebrow">HTML / CSS / JavaScript</p>
        <h1>Web単語暗記辞典</h1>
        <p className="lead">カードをめくって、基本用語を少しずつ覚えよう。</p>
      </section>

      <nav className="start-actions" aria-label="学習メニュー">
        <button className="primary-button" type="button" onClick={onStartStudy}>
          <BookOpen size={22} aria-hidden="true" />
          単語を見る
        </button>
        <button className="secondary-button" type="button" onClick={onStartReview}>
          <Flag size={22} aria-hidden="true" />
          単語を見返す
        </button>
        <button className="secondary-button" type="button" onClick={onOpenDictionary}>
          <Library size={22} aria-hidden="true" />
          辞典
        </button>
      </nav>
    </main>
  );
}

export default StartScreen;
