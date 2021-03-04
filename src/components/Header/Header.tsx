import React, { FC, useContext } from "react";
import { Layout } from "antd";
import "./Header.css";
import { QuizContext } from "../../contexts/QuizContext";

const Header: FC = () => {
  const { score } = useContext(QuizContext);
  return (
    <Layout.Header className="header">
      <h2 onClick={() => window.location.reload()} className="header__title">
        REACT QUIZ
      </h2>
      <h2 className="header__score">Score: {score}</h2>
    </Layout.Header>
  );
};

export { Header };
