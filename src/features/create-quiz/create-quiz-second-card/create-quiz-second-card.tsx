import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { AnswerItem } from "./components/answer-item";

import { observer } from "mobx-react";
import { QuizStore } from "../store/CreateQuizStore";

export const CreateQuizSecondCard: React.FC = observer(() => {
  const [value, setValue] = useState<string>("");

  const [selectedCity1, setSelectedCity1] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const onCityChange = (e: { value: any }) => {
    setSelectedCity1(e.value);
  };

  const [list, setList] = useState([1, 2]);

  const addAnswer = () => {
    const newList = list;
    newList.push(list.length);
    setList([...newList]);
  };

  const removeAnswer = (index: number) => {
    let newList = list;
    newList.splice(index, 1);
    console.log(`Deleted item ${index}`);
    setList([...newList]);
  };

  const QuestionHeaderCard = (
    <div className="flex flex-row align-items-center justify-content-between">
      <div className="create-quiz__title-wrapper">
        <h2 className="create-quiz__title">New question</h2>
      </div>
      <Dropdown
        value={selectedCity1}
        options={cities}
        onChange={onCityChange}
        optionLabel="name"
        className="create-quiz__dropdown"
        placeholder="Question type"
      />
    </div>
  );
  const QuestionFooterCard = (
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
          onClick={() => {
            if (value) {
              QuizStore.addQuestion(value);
              setValue("");
            }
          }}
        />
      </div>
    </div>
  );

  return (
    <Card
      header={QuestionHeaderCard}
      footer={QuestionFooterCard}
      className="create-quiz__second-card create-quiz__common-card-style"
    >
      <div className="flex flex-column align-items-start create-quiz__answers-wrapper">
        <div className="create-quiz__answer">
          <div className="create-quiz__input-label">Question</div>
          <InputText
            style={{ width: "640px" }}
            className="create-quiz__input"
            placeholder="What is your question?"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        </div>

        {list.map((answer, index) => (
          <div key={index}>
            <AnswerItem
              checked={true}
              value={"Answer1"}
              name={"answer"}
              inputId={"answer1"}
              index={index}
              handleClick={removeAnswer}
            />
          </div>
        ))}

        <div className="create-quiz__answer">
          <Button
            label="Add answer"
            className="button__common-style button__create-quiz-add"
            onClick={addAnswer}
          />
        </div>
      </div>
    </Card>
  );
});
