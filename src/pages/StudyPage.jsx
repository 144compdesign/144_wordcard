import { ArrowLeft } from "lucide-react";
import words from "../data/words.json";
import FlashCard from "../components/FlashCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useFlaggedWords } from "../hooks/useFlaggedWords.js";
import { useWordDeck } from "../hooks/useWordDeck.js";

function StudyPage({ mode, filter, onBack }) {
  const { flaggedIds, addFlag, removeFlag } = useFlaggedWords();
  const isReview = mode === "flagged";
  const targetWords = isReview
    ? words.filter((word) => flaggedIds.includes(word.id))
    : words.filter((word) => {
        if (!filter || filter.category === "all") {
          return true;
        }

        return word.category === filter.category && word.level === filter.level;
      });

  const { currentWord, cardKey, currentIndex, totalCount, nextWord, previousWord } =
    useWordDeck(targetWords);

  const pageTitle = isReview ? "単語を見返す" : filter?.title || "全て";
  const pageLabel = isReview ? "Saved words" : filter?.description || "200問すべて";

  function handleFlagAndNext() {
    if (currentWord) {
      addFlag(currentWord.id);
      nextWord();
    }
  }

  function handleRemoveFlagAndNext() {
    if (currentWord) {
      removeFlag(currentWord.id);
      nextWord();
    }
  }

  return (
    <main className="screen study-screen">
      <header className="page-header">
        <button className="icon-button" type="button" onClick={onBack} aria-label="戻る">
          <ArrowLeft size={24} aria-hidden="true" />
        </button>
        <div>
          <p className="eyebrow">{pageLabel}</p>
          <h1>{pageTitle}</h1>
        </div>
      </header>

      {currentWord ? (
        <>
          <p className="counter">
            {currentIndex + 1} / {totalCount}
          </p>
          <FlashCard
            key={cardKey}
            word={currentWord}
            isFlagged={flaggedIds.includes(currentWord.id)}
            onSwipeLeft={previousWord}
            onSwipeRight={nextWord}
            onSwipeDown={handleFlagAndNext}
            onSwipeUp={isReview ? handleRemoveFlagAndNext : undefined}
          />
          <p className="gesture-guide">
            {isReview
              ? "右: 次へ / 左: 前へ / 上: 見返すから外す"
              : "右: 次へ / 左: 前へ / 下: 見返すに保存"}
          </p>
        </>
      ) : (
        <EmptyState
          title={isReview ? "見返すに保存した単語はまだありません" : "単語がありません"}
          text={
            isReview
              ? "単語を見るページで、覚えたいカードを下にスワイプしてください。"
              : "単語データを追加すると表示されます。"
          }
        />
      )}
    </main>
  );
}

export default StudyPage;
