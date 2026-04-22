import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import words from "../data/words.json";
import FlashCard from "../components/FlashCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useFlaggedWords } from "../hooks/useFlaggedWords.js";
import { useWordDeck } from "../hooks/useWordDeck.js";

const DAILY_WORD_COUNT = 10;

function getTodayKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${date}`;
}

function createSeed(text) {
  return [...text].reduce((seed, character) => {
    return seed + character.charCodeAt(0);
  }, 0);
}

function pickDailyWords(allWords, todayKey) {
  const selectedWords = [...allWords];
  let seed = createSeed(todayKey);

  for (let index = selectedWords.length - 1; index > 0; index -= 1) {
    seed = (seed * 9301 + 49297) % 233280;
    const randomIndex = seed % (index + 1);
    [selectedWords[index], selectedWords[randomIndex]] = [
      selectedWords[randomIndex],
      selectedWords[index]
    ];
  }

  return selectedWords.slice(0, DAILY_WORD_COUNT);
}

function DailyWordsPage({ onBack }) {
  const { flaggedIds, addFlag } = useFlaggedWords();
  const todayKey = useMemo(() => getTodayKey(), []);
  const dailyWords = useMemo(() => pickDailyWords(words, todayKey), [todayKey]);
  const { currentWord, cardKey, currentIndex, totalCount, nextWord, previousWord } =
    useWordDeck(dailyWords, {
      repeatOnComplete: false,
      shouldShuffle: false
    });

  function handleFlagAndNext() {
    if (currentWord) {
      addFlag(currentWord.id);
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
          <p className="eyebrow">{todayKey}</p>
          <h1>今日の単語10選</h1>
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
            onSwipeLeft={nextWord}
            onSwipeRight={previousWord}
            onSwipeDown={handleFlagAndNext}
          />
          <p className="gesture-guide">左: 次へ / 右: 前へ / 下: 見返すに保存</p>
        </>
      ) : (
        <EmptyState
          title="本日の単語10個終了"
          text="また明日、新しい10個の単語を確認しましょう。"
        />
      )}
    </main>
  );
}

export default DailyWordsPage;
