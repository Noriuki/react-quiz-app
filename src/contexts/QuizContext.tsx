import { createContext, useState } from "react";

interface QuizContextData {
  userClicks: number;
  score: number;
  handleScore: (param: boolean) => void;
  endgame: () => void;
}

/* create the quiz context */
export const QuizContext = createContext({} as QuizContextData);

/* return a context provider */
export function QuizProvider({ children }: any) {
  const [userClicks, setUserClicks] = useState(0);
  const [score, setScore] = useState(0);

  function handleScore(scored: boolean) {
    scored && setScore(score + 1);
    setUserClicks(userClicks + 1);
  }

  function endgame() {
    setUserClicks(0);
    setScore(0);
  }

  return (
    <QuizContext.Provider
      value={{
        userClicks,
        score,
        handleScore,
        endgame,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
