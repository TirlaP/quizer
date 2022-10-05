import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from "primereact/inputtextarea";

import React from "react";
import { QUESTION_TYPES } from "../../../../common/constants/constant";

interface AnswerItemProps {
  checked: boolean;
  value: string;
  name: string;
  inputId: string;
  index: number;
  handleClick: any;
  handleChange: any;
  handleBlur: any;
  getError: any;
  formValidation: any;
  handleAnswerCheckChange: any;
  questionType: any;
}

export const AnswerItem: React.FC<AnswerItemProps> = ({
  checked,
  value,
  name,
  inputId,
  index,
  handleClick,
  handleChange,
  handleBlur,
  getError,
  formValidation,
  handleAnswerCheckChange,
  questionType,
}) => {
  return (
    <div className="create-quiz__answer">
      <label htmlFor="question" className="create-quiz__input-label">
        Answer {index < 9 ? `0${index + 1}` : `${index + 1}`}*
      </label>
      {questionType !== QUESTION_TYPES.SUBJECTIVE.value && (
        <div className="flex flex-row align-items-center gap-3">
          <InputText
            id={`${name}`}
            style={{ width: "312px" }}
            className={`create-quiz__input ${
              getError(name) ? "create-quiz__input-error" : ""
            }`}
            placeholder="Enter your answer"
            value={value}
            onChange={(event) => {
              handleChange(event.target.value, index);
            }}
            onBlur={() => handleBlur(name)}
          />
          <i
            className="pi pi-trash create-quiz__answer-icon"
            onClick={() => handleClick(index)}
          ></i>
        </div>
      )}
      {questionType !== QUESTION_TYPES.SUBJECTIVE.value && getError(`${name}`)}

      {questionType === QUESTION_TYPES.SINGLE.value && (
        <div className="field-radiobutton mt-2">
          <RadioButton
            inputId={inputId}
            name="isCorrectAnswer"
            value={name}
            onChange={() => handleAnswerCheckChange(index)}
            checked={checked}
          />

          <label htmlFor={inputId}>This is the correct answer</label>
        </div>
      )}

      {questionType === QUESTION_TYPES.MULTIPLE.value && (
        <div className="field-radiobutton mt-2">
          <Checkbox
            inputId={inputId}
            name="isCorrectAnswer"
            value={index}
            onChange={() => handleAnswerCheckChange(index)}
            onBlur={() => handleBlur("answerRadio")}
            checked={checked}
          />
          <label htmlFor={inputId}>This is the correct answer</label>
        </div>
      )}

      {questionType === QUESTION_TYPES.SUBJECTIVE.value && (
        <div className="field-radiobutton mt-2">
          <InputTextarea
            style={{ width: "640px" }}
            className="create-quiz__input"
            placeholder="Enter your answer"
            name={name}
            value={value}
            onChange={() => handleAnswerCheckChange(index)}
          />
        </div>
      )}
    </div>
  );
};
