import { useState } from "react";
import StartScreen from "./pages/StartScreen.jsx";
import LevelSelectPage from "./pages/LevelSelectPage.jsx";
import StudyPage from "./pages/StudyPage.jsx";
import DictionaryPage from "./pages/DictionaryPage.jsx";
import WordDetailPage from "./pages/WordDetailPage.jsx";

function App() {
  const [page, setPage] = useState("start");
  const [studyFilter, setStudyFilter] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);

  function startStudy(filter) {
    setStudyFilter(filter);
    setPage("study");
  }

  function openWordDetail(word) {
    setSelectedWord(word);
    setPage("wordDetail");
  }

  if (page === "study") {
    return (
      <StudyPage
        mode="all"
        filter={studyFilter}
        onBack={() => setPage("levelSelect")}
      />
    );
  }

  if (page === "review") {
    return <StudyPage mode="flagged" onBack={() => setPage("start")} />;
  }

  if (page === "levelSelect") {
    return (
      <LevelSelectPage
        onBack={() => setPage("start")}
        onSelectFilter={startStudy}
      />
    );
  }

  if (page === "dictionary") {
    return (
      <DictionaryPage
        onBack={() => setPage("start")}
        onSelectWord={openWordDetail}
      />
    );
  }

  if (page === "wordDetail" && selectedWord) {
    return (
      <WordDetailPage
        word={selectedWord}
        onBack={() => setPage("dictionary")}
      />
    );
  }

  return (
    <StartScreen
      onStartStudy={() => setPage("levelSelect")}
      onStartReview={() => setPage("review")}
      onOpenDictionary={() => setPage("dictionary")}
    />
  );
}

export default App;
