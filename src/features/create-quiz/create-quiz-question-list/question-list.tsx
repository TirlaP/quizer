import React, { useEffect, useState } from "react";
import { QuestionItem } from "./components/question-item";

interface QuestionListProps {}

export const QuestionList: React.FC<QuestionListProps> = ({}) => {
  const [list, setList] = useState([1, 2, 3]);

  const removeQuestion = (index: number) => {
    let newList = list;
    newList.splice(index, 1);
    console.log(`Deleted item ${index}`);
    setList([...newList]);
  };

  return (
    <div className="flex flex-column align-items-start">
      <h3 className="create-quiz__list-title">Quiz questions</h3>
      {list.map((question, index) => (
        <div key={index}>
          <QuestionItem
            questionName={`Question ${index + 1}`}
            handleClick={removeQuestion}
            id={index}
            answers={Math.floor(Math.random() * 10) + 1}
          />
        </div>
      ))}
    </div>
  );
};
