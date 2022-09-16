import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import { AnswerItem } from "./components/answer-item";

export const CreateQuizSecondCard: React.FC = () => {
  const [answer, setAnswer] = useState(null);
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
      <Dropdown className="create-quiz__dropdown" placeholder="Question type" />
    </div>
  );
  const QuestionFooterCard = (
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
        {/* <AnswerItem
          checked={true}
          value={"Answer1"}
          name={"answer"}
          inputId={"answer1"}
          index={0}
        />
        <AnswerItem
          checked={false}
          value={"Answer2"}
          name={"answer"}
          inputId={"answer2"}
          index={1}
        /> */}

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
            onClick={addAnswer}
          />
        </div>
      </div>
    </Card>
  );
};
