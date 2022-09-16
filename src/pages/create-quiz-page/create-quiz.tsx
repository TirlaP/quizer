import React, { useState } from "react";
import "./create-quiz.scss";
import { Header } from "../../common/components/header/header";
import { CreateQuizFirstCard } from "../../features/create-quiz/create-quiz-first-card/create-quiz-first-card";
import { CreateQuizSecondCard } from "../../features/create-quiz/create-quiz-second-card/create-quiz-second-card";
import { QuestionList } from "../../features/create-quiz/create-quiz-question-list/question-list";

interface CreateQuizProps {}

export const CreateQuiz: React.FC<CreateQuizProps> = ({}) => {
  return (
    <div className="create-quiz flex flex-column">
      <Header />
      <CreateQuizFirstCard />

      <div className="flex flex-row card--center mt-6 gap-3">
        <CreateQuizSecondCard />

        <QuestionList />
      </div>
    </div>
  );
};
