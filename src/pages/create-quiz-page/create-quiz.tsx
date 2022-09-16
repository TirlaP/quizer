import React, { useState } from "react";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import "./create-quiz.scss";
import "../../styles/buttons.scss";
import { Header } from "../../common/components/header/header";

interface CreateQuizProps {}

export const CreateQuiz: React.FC<CreateQuizProps> = ({}) => {
  const [answer, setAnswer] = useState(null);

  const HeaderCard1 = (
    <div className="flex flex-row align-items-center justify-content-between">
      <div className="create-quiz__title-wrapper">
        <h2 className="create-quiz__title">New quiz</h2>
        <p className="create-quiz__subtitle">
          Create a new quiz or check back on the ones that are already created.
        </p>
      </div>
      <div className="create-quiz__button-wrapper">
        <Button
          label="Cancel"
          className="button__common-style button__create-quiz-cancel"
        />
        <Button
          label="Create quiz"
          className="button__common-style button__create-quiz-create"
        />
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
          className="button__common-style button__create-quiz-remove"
        />
      </div>
      <div className="create-quiz__button-wrapper">
        <Button
          label="Cancel"
          className="button__common-style button__create-quiz-cancel"
        />
        <Button
          label="Save"
          className="button__common-style button__create-quiz-save"
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
    <div className="create-quiz flex flex-column button">
      <Header />
      <div className="card--center mt-6">
        <Card
          header={HeaderCard1}
          footer={FooterCard1}
          className="create-quiz__first-card create-quiz__common-card-style"
        ></Card>
      </div>

      <div className="flex flex-row card--center mt-6 gap-3">
        <Card
          header={HeaderCard2}
          footer={FooterCard2}
          className="create-quiz__second-card create-quiz__common-card-style"
        >
          <div className="flex flex-column align-items-start create-quiz__answers-wrapper">
            <div className="create-quiz__answer">
              <div className="create-quiz__input-label">Question</div>
              <InputText
                style={{ width: "640px" }}
                className="create-quiz__input"
                placeholder="What is your question?"
              />
            </div>

            <div className="create-quiz__answer">
              <div className="create-quiz__input-label">Answer 01</div>
              <div className="flex flex-row align-items-center gap-3">
                <InputText
                  style={{ width: "312px" }}
                  className="create-quiz__input"
                  placeholder="Enter your answer"
                />
                <i className="pi pi-trash"></i>
              </div>
              <div className="field-radiobutton mt-2">
                <RadioButton
                  inputId="answer1"
                  name="answer"
                  value="Answer1"
                  onChange={(e) => setAnswer(e.value)}
                  checked={answer === "Answer1"}
                />
                <label htmlFor="answer1">This is the correct answer</label>
              </div>
            </div>

            <div className="create-quiz__answer">
              <div className="create-quiz__input-label">Answer 02</div>
              <div className="flex flex-row align-items-center gap-3">
                <InputText
                  style={{ width: "312px" }}
                  className="create-quiz__input"
                  placeholder="Enter your answer"
                />
                <i className="pi pi-trash"></i>
              </div>
              <div className="field-radiobutton mt-2">
                <RadioButton
                  inputId="answer2"
                  name="answer"
                  value="Answer2"
                  onChange={(e) => setAnswer(e.value)}
                  checked={answer === "Answer2"}
                />
                <label htmlFor="answer2">This is the correct answer</label>
              </div>
            </div>

            <div className="create-quiz__answer">
              <Button
                label="Add answer"
                className="button__common-style button__create-quiz-add"
              />
            </div>
          </div>
        </Card>

        <div className="flex flex-column align-items-start">
          <h3 className="create-quiz__list-title">Quiz questions</h3>
          <Card
            header={HeaderCard3}
            className="create-quiz__third-card create-quiz__common-card-style"
          ></Card>
        </div>
      </div>
    </div>
  );
};
