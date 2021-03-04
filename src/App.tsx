import { Layout } from "antd";
import React, { FC, useContext, useEffect, useState } from "react";
import { reqQuestions } from "./ApiService";
import { Header } from "./components/Header/Header";
import { QuizCards } from "./components/QuizCards/QuizCards";
import { QuizMenu } from "./components/QuizMenu/QuizMenu";
import { QuizContext, QuizProvider } from "./contexts/QuizContext";

const App: FC = () => {
  const [quizState, setQuizState] = useState([]);
  const { endgame, userClicks } = useContext(QuizContext);

  async function startQuiz(amount: string, difficulty: string) {
    await reqQuestions(amount, difficulty).then((res) => {
      return setQuizState(res);
    });
  }
  function configCallback(amount: string, difficulty: string) {
    startQuiz(amount, difficulty);
  }
  useEffect(() => {
    if (userClicks >= quizState.length) endgame();
  }, [userClicks, endgame, quizState.length]);

  return (
    <QuizProvider>
      <Layout>
        <Header />
        <Layout.Content className="container">
          {!quizState.length ? (
            <QuizMenu callback={configCallback} />
          ) : (
            <QuizCards Questions={quizState && quizState} />
          )}
        </Layout.Content>
      </Layout>
    </QuizProvider>
  );
};

export default App;
