import { Card } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import React, { FC, useContext, useState } from "react";
import { QuizContext } from "../../contexts/QuizContext";
import { QuestionsState } from "../../types/QuizTypes";
import "./QuizCards.css";

interface IQuizCardsProps {
  Questions: QuestionsState[];
}

const QuizCards: FC<IQuizCardsProps> = ({ Questions, ...rest }) => {
  const [QuestionIndex, setQuestionIndex] = useState(0);
  const [userClicked, setUserClicked] = useState(false);
  const { handleScore } = useContext(QuizContext);

  function handleUserClick(cAnswer: string, e: any, opt: string) {
    e.preventDefault();
    const btn = e.currentTarget;

    const correct = cAnswer === opt;

    if (correct) {
      handleScore(true);
      btn.style.backgroundColor = "rgba(39, 196, 52, 1)";
      btn.style.border = "2px solid rgba(39, 196, 52, 1)";
      btn.style.boxShadow =
        "0 0.4em rgba(39, 196, 52, 0.5), 0 0.5em rgba(0, 0, 0, 0.5)";
    } else {
      handleScore(false);
      btn.style.backgroundColor = "rgba(255, 0, 0, 1)";
      btn.style.border = "2px solid rgba(255, 0, 0, 1)";
      btn.style.boxShadow =
        "0 0.4em rgba(255, 0, 0, 0.5), 0 0.5em rgba(0, 0, 0, 0.5)";
    }

    setUserClicked(true);
  }

  function nextQuestion() {
    if (QuestionIndex < Questions.length - 1) {
      setQuestionIndex(QuestionIndex + 1);
    }
    console.log("rodou no inicio");
    setUserClicked(false);
  }

  return (
    <div className="quiz-card">
      <p>Question: {`${QuestionIndex + 1}/${Questions.length}`}</p>
      <h2
        className="quiz-card__title"
        dangerouslySetInnerHTML={{ __html: Questions[QuestionIndex].question }}
      />

      <Card bordered={false} className="quiz-card__options">
        {Questions[QuestionIndex].answers.map((opt) => (
          <button
            className="quiz-card__optionbtn"
            key={opt}
            disabled={userClicked}
            onClick={(e) =>
              handleUserClick(Questions[QuestionIndex].correct_answer, e, opt)
            }
            dangerouslySetInnerHTML={{ __html: opt }}
          ></button>
        ))}
      </Card>
      {QuestionIndex < 9 && (
        <button
          className="quiz-card__nextbtn"
          disabled={!userClicked}
          type="button"
          onClick={nextQuestion}
        >
          Next Question <DoubleRightOutlined />
        </button>
      )}
    </div>
  );
};
export { QuizCards };
