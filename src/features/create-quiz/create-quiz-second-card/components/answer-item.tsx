import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import React from "react";

interface AnswerItemProps {
  checked: boolean;
  value: string;
  name: string;
  inputId: string;
  index: number;
  handleClick: any;
}

export const AnswerItem: React.FC<AnswerItemProps> = ({
  checked,
  value,
  name,
  inputId,
  index,
  handleClick,
}) => {
  return (
    <div className="create-quiz__answer">
      <div className="create-quiz__input-label">Answer {`0${index + 1}`}</div>
      <div className="flex flex-row align-items-center gap-3">
        <InputText
          style={{ width: "312px" }}
          className="create-quiz__input"
          placeholder="Enter your answer"
        />
        <i
          className="pi pi-trash create-quiz__answer-icon"
          onClick={() => handleClick(index)}
        ></i>
      </div>
      <div className="field-radiobutton mt-2">
        <RadioButton
          inputId={inputId}
          name={name}
          value={value}
          // onChange={(e) => setAnswer(e.value)}
          checked={checked}
        />
        <label htmlFor={inputId}>This is the correct answer</label>
      </div>
    </div>
  );
};
