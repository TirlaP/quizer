import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

import { observer } from "mobx-react";
import { QuizStore } from "../../store/CreateQuizStore";

interface QuestionItemProps {
  questionName: string;
  handleClick: any;
  handleSelect: any;
  numberOfAnswers: number | undefined;
  id: number;
}

export const QuestionItem: React.FC<QuestionItemProps> = observer(
  ({ questionName, handleClick, handleSelect, numberOfAnswers, id }) => {
    const QuestionListItemHeaderCard = (
      <div className="flex flex-column">
        <div className="flex flex-row align-items-center justify-content-between">
          <h3 className="create-quiz__list-text">{questionName}</h3>
          <Button
            icon="pi pi-times"
            className="p-button-squared p-button-danger p-button-outlined"
            aria-label="Cancel"
            onClick={handleClick}
            style={{ width: "23.5px", height: "23.5px" }}
          />
        </div>
        <div>
          <div className="flex flex-row align-items-center gap-2">
            <i className="pi pi-file"></i>
            <p>{numberOfAnswers} answers</p>
          </div>
        </div>
      </div>
    );

    const handle = () => {
      console.log(
        `Id ${QuizStore.selectedQuestion?.question?.id} equal to ${id}`
      );
    };
    return (
      <Card
        header={QuestionListItemHeaderCard}
        className={`create-quiz__third-card create-quiz__common-card-style mb-3 ${
          QuizStore.selectedQuestion?.question?.id === id
            ? "create-quiz__third-card--active"
            : ""
        }`}
        onClick={() => {
          handleSelect();
          handle();
        }}
      ></Card>
    );
  }
);
