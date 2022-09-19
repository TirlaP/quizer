import React from "react";
import { QuestionItem } from "./components/question-item";

import { observer } from "mobx-react";
import { QuizStore } from "../store/CreateQuizStore";

interface QuestionListProps {}

export const QuestionList: React.FC<QuestionListProps> = observer(() => {
  return (
    <div className="flex flex-column align-items-start">
      <h3 className="create-quiz__list-title">Quiz questions</h3>
      <div className="create-quiz__question-list">
        {QuizStore.questions.map((question, index) => (
          <div key={index}>
            <QuestionItem
              questionName={`Question ${question.title}`}
              handleClick={() => QuizStore.removeQuestion(question.id)}
              answers={Math.floor(Math.random() * 10) + 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
});
