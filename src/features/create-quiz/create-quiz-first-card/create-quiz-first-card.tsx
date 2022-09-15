import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import React from "react";

export const CreateQuizFirstCard: React.FC = () => {
  const HeaderCard1 = (
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
  const FooterCard1 = (
    <div className="flex flex-column align-items-start">
      <div className="create-quiz__input-label">Quiz name</div>
      <InputText className="create-quiz__input" placeholder="Enter quiz name" />
    </div>
  );

  return (
    <div className="card--center mt-6">
      <Card
        header={HeaderCard1}
        footer={FooterCard1}
        className="create-quiz__first-card create-quiz__common-card-style"
      ></Card>
    </div>
  );
};
