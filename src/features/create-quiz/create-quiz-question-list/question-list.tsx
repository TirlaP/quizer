import React from "react";
import { QuestionItem } from "./components/question-item";

import { observer } from "mobx-react";
import { QuizStore } from "../store/CreateQuizStore";
import { toJS } from "mobx";

interface QuestionListProps {}

export const QuestionList: React.FC<QuestionListProps> = observer(() => {
  return (
    <div className="flex flex-column align-items-start">
      <h3 className="create-quiz__list-title">Quiz questions</h3>
      <div className="create-quiz__question-list">
        {QuizStore.questions.map((question, index) => (
          <div key={index}>
            <QuestionItem
              questionName={`${
                question.question?.questionName || "Untitled question"
              }`}
              handleClick={() => QuizStore.removeQuestion(question.id)}
              handleSelect={() => {
                QuizStore.selectQuestion(question);
              }}
              numberOfAnswers={question.question?.answerList.length}
              id={question.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
});
