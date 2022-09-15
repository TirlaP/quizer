import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { RadioButton } from "primereact/radiobutton";

export const CreateQuizSecondCard: React.FC = () => {
  const [answer, setAnswer] = useState(null);

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

  return (
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
            style={{
              width: "152px",
              height: "40px",
              padding: "4px 24px",
              color: "#272022",
            }}
            label="Add answer"
            className="create-quiz__button-cancel"
          />
        </div>
      </div>
    </Card>
  );
};
