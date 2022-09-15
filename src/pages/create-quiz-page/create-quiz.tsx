import React, { useState } from "react";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import "./create-quiz.scss";
import { Header } from "../../common/components/header/header";
import { CreateQuizFirstCard } from "../../features/create-quiz/create-quiz-first-card/create-quiz-first-card";
import { CreateQuizSecondCard } from "../../features/create-quiz/create-quiz-second-card/create-quiz-second-card";
import { QuestionList } from "../../features/create-quiz/create-quiz-question-list/question-list";

interface CreateQuizProps {}

export const CreateQuiz: React.FC<CreateQuizProps> = ({}) => {
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

  const HeaderCard2 = (
    <div className="flex flex-row align-items-center justify-content-between">
      <div className="create-quiz__title-wrapper">
        <h2 className="create-quiz__title">New question</h2>
      </div>
      <Dropdown className="create-quiz__dropdown" placeholder="Question type" />
    </div>
  );
  const FooterCard2 = (
    <div className="flex flex-row justify-content-between create-quiz__footer-buttons">
      <div>
        <Button
          style={{ width: "167px" }}
          label="Remove"
          className="create-quiz__button-cancel"
        />
      </div>
      <div className="create-quiz__button-wrapper">
        <Button label="Cancel" className="create-quiz__button-cancel" />
        <Button
          style={{ width: "138px" }}
          label="Save"
          className="create-quiz__button-create"
        />
      </div>
    </div>
  );

  const HeaderCard3 = (
    <div className="flex flex-column">
      <div className="flex flex-row align-items-center justify-content-between">
        <h3 className="create-quiz__list-text">Untitled question</h3>
        <Button
          icon="pi pi-times"
          className="p-button-squared p-button-danger p-button-outlined"
          aria-label="Cancel"
          style={{ width: "23.5px", height: "23.5px" }}
        />
      </div>
      <div>
        <div className="flex flex-row align-items-center gap-2">
          <i className="pi pi-file"></i>
          <p>2 answers</p>
        </div>
      </div>
    </div>
  );

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
