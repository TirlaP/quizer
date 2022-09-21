import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { classNames } from "primereact/utils";
import React from "react";

interface AnswerItemProps {
  checked: boolean;
  value: string;
  name: string;
  inputId: string;
  index: number;
  handleClick: any;
  handleChange: any;
  getError: any;
  formValidation: any;
  handleRadioChange: any;
}

export const AnswerItem: React.FC<AnswerItemProps> = ({
  checked,
  value,
  name,
  inputId,
  index,
  handleClick,
  handleChange,
  getError,
  formValidation,
  handleRadioChange,
}) => {
  return (
    <div className="create-quiz__answer">
      <label
        htmlFor="question"
        className={`create-quiz__input-label ${classNames({
          " p-error": formValidation(`${name}`),
        })}`}
      >
        Answer {`0${index + 1}`}*
      </label>
      <div className="flex flex-row align-items-center gap-3">
        <InputText
          id={`${name}`}
          style={{ width: "312px" }}
          className="create-quiz__input"
          placeholder="Enter your answer"
          value={value}
          onChange={(event) => {
            console.log(event.target.value);
            console.log(name);
            handleChange(event.target.value, index, "answerName");
          }}
        />
        <i
          className="pi pi-trash create-quiz__answer-icon"
          onClick={() => handleClick(index)}
        ></i>
      </div>
      {getError(`${name}`)}

      <div className="field-radiobutton mt-2">
        <RadioButton
          inputId={inputId}
          name={name}
          value={value}
          onChange={() => handleRadioChange(index)}
          checked={checked}
        />
        <label htmlFor={inputId}>This is the correct answer</label>
      </div>
    </div>
  );
};
