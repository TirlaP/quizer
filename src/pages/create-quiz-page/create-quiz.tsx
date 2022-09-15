import React from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "./create-quiz.scss";
import { InputText } from "primereact/inputtext";

interface CreateQuizProps {}

export const CreateQuiz: React.FC<CreateQuizProps> = ({}) => {
  const Header = (
    <div className="flex flex-row align-items-center justify-content-between">
      <div className="create-quiz__title-wrapper">
        <h2 className="create-quiz__title">New quiz</h2>
        <p className="create-quiz__subtitle">
          Create a new quiz or check back on the ones that are already created.
        </p>
      </div>
      <div className="create-quiz__button-wrapper">
        <Button label="Cancel" className="create-quiz__button-cancel" />
        <Button label="Create quiz" className="create-quiz__button-create" />
      </div>
    </div>
  );
  const Footer = (
    <div className="flex flex-column align-items-start">
      <div className="create-quiz__input-label">Quiz name</div>
      <InputText className="create-quiz__input" />
    </div>
  );

  return (
    <div className="create-quiz">
      <div className="card--center mt-6">
        <Card
          header={Header}
          footer={Footer}
          className="create-quiz__card"
        ></Card>
      </div>
    </div>
  );
};
