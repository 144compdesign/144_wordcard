import { useEffect, useState } from "react";

const STORAGE_KEY = "flaggedIds";

function readFlaggedIds() {
  const savedValue = localStorage.getItem(STORAGE_KEY);

  if (!savedValue) {
    return [];
  }

  try {
    return JSON.parse(savedValue);
  } catch {
    return [];
  }
}

export function useFlaggedWords() {
  const [flaggedIds, setFlaggedIds] = useState(readFlaggedIds);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flaggedIds));
  }, [flaggedIds]);

  function addFlag(id) {
    setFlaggedIds((currentIds) => {
      if (currentIds.includes(id)) {
        return currentIds;
      }

      return [...currentIds, id];
    });
  }

  function removeFlag(id) {
    setFlaggedIds((currentIds) => {
      return currentIds.filter((currentId) => currentId !== id);
    });
  }

  return { flaggedIds, addFlag, removeFlag };
}
