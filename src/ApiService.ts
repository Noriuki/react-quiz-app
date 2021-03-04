import { Question } from "./types/QuizTypes";

function shuffleArray(array: any[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

export const reqQuestions = async (amount: string, difficulty: string) => {
  const data = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
  ).then((response) => response.json());

  /* map the questions answers and shuffles the options */
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
