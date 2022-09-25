import React from "react";
import { Header } from "../../common/components/header/header";
import { NoQuizzes } from "../no-quizzes-page/no-quizzes";
import { QuizList } from "../quiz-list-page/quiz-list-page";

import "../../styles/buttons.scss";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = ({}) => {
  return (
    <div className="button">
      <Header />
      {/* <NoQuizzes /> */}
      <QuizList />
    </div>
  );
};
