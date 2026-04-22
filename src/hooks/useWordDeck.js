import { useEffect, useMemo, useState } from "react";

function shuffleWords(words) {
  const copiedWords = [...words];

  for (let index = copiedWords.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copiedWords[index], copiedWords[randomIndex]] = [
      copiedWords[randomIndex],
      copiedWords[index]
    ];
  }

  return copiedWords;
}

export function useWordDeck(
  words,
  { repeatOnComplete = true, shouldShuffle = true } = {}
) {
  const wordIds = useMemo(() => words.map((word) => word.id).join(","), [words]);
  const [deck, setDeck] = useState(() => (shouldShuffle ? shuffleWords(words) : words));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardKey, setCardKey] = useState(0);

  useEffect(() => {
    setDeck(shouldShuffle ? shuffleWords(words) : words);
    setCurrentIndex(0);
    setCardKey((currentKey) => currentKey + 1);
  }, [wordIds, shouldShuffle]);

  function nextWord() {
    setCurrentIndex((index) => {
      if (deck.length === 0) {
        return 0;
      }

      if (index >= deck.length - 1) {
        setCardKey((currentKey) => currentKey + 1);

        if (repeatOnComplete) {
          setDeck(shouldShuffle ? shuffleWords(words) : words);
          return 0;
        }

        return deck.length;
      }

      setCardKey((currentKey) => currentKey + 1);
      return index + 1;
    });
  }

  function previousWord() {
    setCurrentIndex((index) => {
      setCardKey((currentKey) => currentKey + 1);
      return Math.max(index - 1, 0);
    });
  }

  return {
    currentWord: deck[currentIndex],
    cardKey,
    currentIndex,
    totalCount: deck.length,
    nextWord,
    previousWord
  };
}
