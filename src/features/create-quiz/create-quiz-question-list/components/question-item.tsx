import React, { useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

import { observer } from "mobx-react";
import { QuizStore } from "../../store/CreateQuizStore";
import { toJS } from "mobx";

interface QuestionItemProps {
  questionName: string;
  handleClick: any;
  handleSelect: any;
  id: string;
  numberOfAnswers?: number;
}

export const QuestionItem: React.FC<QuestionItemProps> = observer(
  ({ questionName, handleClick, handleSelect, numberOfAnswers, id }) => {
    const QuestionListItemHeaderCard = (
      <div className="flex flex-column">
        <div className="flex flex-row align-items-center justify-content-between">
          <h3 className="create-quiz__list-text">{questionName}</h3>
          {QuizStore.questions.length > 1 && (
            <Button
              icon="pi pi-times"
              className="p-button-squared p-button-danger p-button-outlined"
              aria-label="Cancel"
              onClick={(event) => {
                event.stopPropagation();

                if (QuizStore.selectedQuestionID === id) {
                  QuizStore.selectQuestion(
                    QuizStore.questions[QuizStore.questions.length - 1]
                  );
                  console.log(
                    toJS(QuizStore.questions[QuizStore.questions.length - 1])
                  );
                }
                handleClick();
              }}
              style={{ width: "23.5px", height: "23.5px" }}
            />
          )}
        </div>
        <div>
          <div className="flex flex-row align-items-center gap-2">
            <i className="pi pi-file"></i>
            <p>{numberOfAnswers} answers</p>
          </div>
        </div>
      </div>
    );

    return (
      <Card
        header={QuestionListItemHeaderCard}
        className={`create-quiz__third-card create-quiz__common-card-style mb-3 ${
          QuizStore.selectedQuestionID === id
            ? "create-quiz__third-card--active"
            : ""
        }`}
        onClick={() => handleSelect()}
      ></Card>
    );
  }
);
