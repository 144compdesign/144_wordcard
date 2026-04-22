import { useState } from "react";
import StartScreen from "./pages/StartScreen.jsx";
import LevelSelectPage from "./pages/LevelSelectPage.jsx";
import PracticalSelectPage from "./pages/PracticalSelectPage.jsx";
import DailyWordsPage from "./pages/DailyWordsPage.jsx";
import StudyPage from "./pages/StudyPage.jsx";
import DictionaryPage from "./pages/DictionaryPage.jsx";
import WordDetailPage from "./pages/WordDetailPage.jsx";

function App() {
  const [page, setPage] = useState("start");
  const [studyFilter, setStudyFilter] = useState(null);
  const [studyBackPage, setStudyBackPage] = useState("levelSelect");
  const [selectedWord, setSelectedWord] = useState(null);

  function startStudy(filter, backPage = "levelSelect") {
    setStudyFilter(filter);
    setStudyBackPage(backPage);
    setPage("study");
  }

  function startPracticalStudy(category) {
    startStudy(
      {
        category,
        level: "all",
        title: category,
        description: "実務用語"
      },
      "practicalSelect"
    );
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
        onBack={() => setPage(studyBackPage)}
      />
    );
  }

  if (page === "review") {
    return <StudyPage mode="flagged" onBack={() => setPage("start")} />;
  }

  if (page === "dailyWords") {
    return <DailyWordsPage onBack={() => setPage("start")} />;
  }

  if (page === "levelSelect") {
    return (
      <LevelSelectPage
        onBack={() => setPage("start")}
        onSelectFilter={startStudy}
      />
    );
  }

  if (page === "practicalSelect") {
    return (
      <PracticalSelectPage
        onBack={() => setPage("start")}
        onSelectCategory={startPracticalStudy}
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
      onStartPractical={() => setPage("practicalSelect")}
      onStartDailyWords={() => setPage("dailyWords")}
      onStartReview={() => setPage("review")}
      onOpenDictionary={() => setPage("dictionary")}
    />
  );
}

export default App;
