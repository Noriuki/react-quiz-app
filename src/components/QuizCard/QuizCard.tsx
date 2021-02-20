import React, { Component } from "react";
import { Card } from "antd";

import { QuestionsState } from "../../functions/quizApi";

import "./QuizCard.css";

interface CardProps {
  answerObj: QuestionsState;
  callback: (e: React.MouseEvent<HTMLButtonElement>, correct: boolean) => void;
}

class QuizCard extends Component<
  CardProps,
  { userAnswer: string; userClicked: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      userAnswer: "",
      userClicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  async handleClick(e: React.MouseEvent<HTMLButtonElement>, opt: string) {
    e.preventDefault();
    let btn = e.currentTarget;
    const { correct_answer } = this.props.answerObj;

    await this.handleAnswer(opt);
    let correct = correct_answer === this.state.userAnswer;
    btn.style.backgroundColor = correct ? "green" : "red";

    return this.props.callback(e, correct);
  }

  handleAnswer(answer: string) {
    this.setState({ userAnswer: answer, userClicked: true });
  }

  render() {
    const { answerObj } = this.props;
    return (
      <div className="quiz-card">
        <h2
          className="quiz-card__title"
          dangerouslySetInnerHTML={{ __html: answerObj.question }}
        />
        <Card bordered={false} className="quiz-card__options">
          {answerObj?.answers.map((opt) => (
            <button
              className="quiz-card__btn"
              key={opt}
              disabled={this.state.userClicked}
              onClick={(e) => this.handleClick(e, opt)}
              dangerouslySetInnerHTML={{ __html: opt }}
            ></button>
          ))}
        </Card>
      </div>
    );
  }
}

export default QuizCard;
