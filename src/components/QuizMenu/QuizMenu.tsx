import { Select } from "antd";
import React, { FC, useState } from "react";
import "./QuizMenu.css";

interface IMenuProps {
  callback: (amount: string, difficulty: string) => void;
}

const QuizMenu: FC<IMenuProps> = ({ callback, ...rest }) => {
  const [difficulty, setDifficulty] = useState("medium");
  const [amount, setAmount] = useState("10");

  function handleDifficulty(difficulty: string) {
    setDifficulty(difficulty);
  }
  function handleAmount(amount: string) {
    setAmount(amount);
  }

  function handleProps(e: any) {
    e.preventDefault();
    callback(amount, difficulty);
  }

  return (
    <>
      <h2 className="menu__title">QUIZ GAME</h2>
      <div className="menu__options">
        <div>
          <span>Questions Quantity</span>
          <Select
            defaultValue="10"
            onChange={(value) => {
              handleAmount(value);
            }}
          >
            <Select.Option value="5">5</Select.Option>
            <Select.Option value="10">10</Select.Option>
            <Select.Option value="15">15</Select.Option>
          </Select>
        </div>
        <div>
          <span>Quiz Difficulty</span>
          <Select
            defaultValue="medium"
            onChange={(value) => {
              handleDifficulty(value);
            }}
          >
            <Select.Option value="easy">easy</Select.Option>
            <Select.Option value="medium">medium</Select.Option>
            <Select.Option value="hard">hard</Select.Option>
          </Select>
        </div>
      </div>
      <button
        type="button"
        className="menu__btn"
        onClick={(e) => {
          handleProps(e);
        }}
      >
        Start Quiz
      </button>
    </>
  );
};

export { QuizMenu };
