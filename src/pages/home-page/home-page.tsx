import React from "react";
import { Header } from "../../common/components/header/header";
import { NoQuizzes } from "../no-quizzes-page/no-quizzes";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = ({}) => {
  return (
    <div>
      <Header />
      <NoQuizzes />
    </div>
  );
};
