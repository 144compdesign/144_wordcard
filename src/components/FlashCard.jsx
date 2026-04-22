import { useState } from "react";
import { Flag } from "lucide-react";

const SWIPE_DISTANCE = 60;
const LEVEL_LABELS = {
  basic: "Level1",
  intermediate: "Level2",
  advanced: "Level3"
};

function FlashCard({
  word,
  isFlagged,
  onSwipeLeft,
  onSwipeRight,
  onSwipeDown,
  onSwipeUp
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [leavingClass, setLeavingClass] = useState("");

  function handlePointerDown(event) {
    setStartPoint({ x: event.clientX, y: event.clientY });
    setDrag({ x: 0, y: 0 });
  }

  function handlePointerMove(event) {
    if (!startPoint) {
      return;
    }

    setDrag({
      x: event.clientX - startPoint.x,
      y: event.clientY - startPoint.y
    });
  }

  function handlePointerUp() {
    if (!startPoint) {
      return;
    }

    const absX = Math.abs(drag.x);
    const absY = Math.abs(drag.y);

    if (absX >= SWIPE_DISTANCE && absX > absY) {
      runSwipe(drag.x < 0 ? "swipe-left" : "swipe-right");
      return;
    }

    if (absY >= SWIPE_DISTANCE && absY > absX) {
      if (drag.y < 0 && onSwipeUp) {
        runSwipe("swipe-up");
        return;
      }

      if (drag.y > 0) {
        runSwipe("swipe-down");
        return;
      }

      return;
    }

    if (absX < 10 && absY < 10) {
      setIsFlipped((current) => !current);
    }

    resetDrag();
  }

  function runSwipe(directionClass) {
    setLeavingClass(directionClass);

    window.setTimeout(() => {
      if (directionClass === "swipe-left") {
        onSwipeLeft();
      }

      if (directionClass === "swipe-right") {
        onSwipeRight();
      }

      if (directionClass === "swipe-down") {
        onSwipeDown();
      }

      if (directionClass === "swipe-up") {
        onSwipeUp();
      }
    }, 220);
  }

  function resetDrag() {
    setStartPoint(null);
    setDrag({ x: 0, y: 0 });
  }

  const rotate = drag.x / 18;
  const cardStyle = {
    transform: `translate(${drag.x}px, ${drag.y}px) rotate(${rotate}deg)`
  };

  return (
    <section
      className={`flash-card-shell ${leavingClass}`}
      style={leavingClass ? undefined : cardStyle}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={resetDrag}
      aria-label={`${word.term}のカード`}
    >
      <div className={`flash-card ${isFlipped ? "is-flipped" : ""}`}>
        <article className="card-face card-front">
          <div className="card-top">
            <div className="badge-row">
              <span className={`category category-${word.category.toLowerCase()}`}>
                {word.category}
              </span>
              <span className={`level level-${word.level}`}>
                {LEVEL_LABELS[word.level]}
              </span>
            </div>
            {isFlagged && <Flag className="flag-icon" size={22} aria-label="見返すに保存済み" />}
          </div>
          <h2>{word.term}</h2>
          <p>タップで意味を見る</p>
        </article>

        <article className="card-face card-back">
          <div className="card-top">
            <div className="badge-row">
              <span className={`category category-${word.category.toLowerCase()}`}>
                {word.category}
              </span>
              <span className={`level level-${word.level}`}>
                {LEVEL_LABELS[word.level]}
              </span>
            </div>
            {isFlagged && <Flag className="flag-icon" size={22} aria-label="見返すに保存済み" />}
          </div>
          <div className="meaning-area">
            <h2 className="meaning-heading">意味</h2>
            <p className="short-meaning">{word.shortMeaning}</p>
            <p className="meaning">{word.meaning}</p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default FlashCard;
