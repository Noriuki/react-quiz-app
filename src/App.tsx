import React, { Component } from "react";
import { Layout, BackTop } from "antd";
import { reqQuestions } from "./functions/quizApi";

import "./App.css";

import QuizCard from "./components/QuizCard/QuizCard";

import { Difficulty, QuestionsState } from "./functions/quizApi";

interface IAppState {
  quiz: Array<QuestionsState>;
  userClicks: number;
  score: number;
  amount: number;
  difficulty: Difficulty;
  correct: boolean;
}

class App extends Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      quiz: [],
      userClicks: 0,
      score: 0,
      amount: 10,
      difficulty: Difficulty.EASY,
      correct: false,
    };

    this.startGame = this.startGame.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.endgame = this.endgame.bind(this);
  }

  checkAnswer(e: React.MouseEvent<HTMLButtonElement>, res: boolean) {
    e.preventDefault();

    return res === true ? this.handleScore(true) : this.handleScore(false);
  }

  async handleScore(scored: boolean) {
    let { score: oldScore } = this.state;
    this.endgame();
    if (scored) {
      await this.setState({ score: oldScore + 1 });
    }
  }

  async endgame() {
    let clicks = this.state.userClicks;

    await this.setState({ userClicks: clicks + 1 });

    if (this.state.userClicks >= 10) {
      this.setState({ quiz: [], userClicks: 0 });
    }
  }

  async startGame() {
    let { amount, difficulty } = this.state;

    await reqQuestions(amount, difficulty).then((res) => {
      console.log("res app: ", res);
      return this.setState({ quiz: res, score: 0 });
    });
  }

  render() {
    const { quiz, score } = this.state;
    return (
      <Layout>
        <Layout.Content className="content">
          <div className="header">
            <h2 className="header__title">REACT QUIZ</h2>
            <h2 className="header__score">Score: {score}</h2>
          </div>
          {!quiz.length ? (
            <button className="start-btn" onClick={this.startGame}>
              Start
            </button>
          ) : null}
          {quiz.map((question) => {
            return (
              <QuizCard
                key={question.question}
                answerObj={question}
                callback={this.checkAnswer}
              />
            );
          })}
          <BackTop />
        </Layout.Content>
      </Layout>
    );
  }
}

export default App;
