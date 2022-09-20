import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { AnswerItem } from "./components/answer-item";

import { observer } from "mobx-react";
import { QuizStore } from "../store/CreateQuizStore";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase-config";

export interface Question {
  answerList: AnswersList[];
  questionName: string;
  questionType: string | null;
}

export interface AnswersList {
  isCorrectAnswer: boolean;
  answerName: string;
}

export const CreateQuizSecondCard: React.FC = observer(() => {
  const [question, setQuestion] = useState<Question | null>(null);

  const [questionName, setQuestionName] = useState<string>("");

  const [questionType, setQuestionType] = useState(null);
  const questionTypes = [
    { name: "Multiple answers" },
    { name: "Single answer" },
    { name: "Subjective" },
  ];

  const onCityChange = (e: { value: any }) => {
    setQuestionType(e.value);
  };

  const [answerList, setAnswerList] = useState<AnswersList[]>([
    {
      isCorrectAnswer: true,
      answerName: "",
    },
  ]);

  const handleInputChange = (value: any, index: number) => {
    const newList = answerList;
    newList[index].answerName = value;
    setAnswerList(newList);
  };

  const addAnswer = () => {
    const newList = answerList;
    newList.push({ isCorrectAnswer: false, answerName: "" });
    setAnswerList([...newList]);
  };

  const removeAnswer = (index: number) => {
    let newList = answerList;
    newList.splice(index, 1);
    console.log(`Deleted item ${index}`);
    setAnswerList([...newList]);
  };

  const handleFirebaseAdd = async (e: any) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "questions"), {
        ...question,
        timeStamp: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setQuestion({
      answerList,
      questionName,
      questionType,
    });
  }, [answerList, questionName, questionType]);

  const QuestionHeaderCard = (
    <div className="flex flex-row align-items-center justify-content-between">
      <div className="create-quiz__title-wrapper">
        <h2 className="create-quiz__title">New question</h2>
      </div>
      <Dropdown
        value={questionType}
        options={questionTypes}
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
          onClick={(event) => {
            console.log(question);
            if (question) {
              QuizStore.addQuestion(question);
              setQuestionName("");
              handleFirebaseAdd(event);
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
            value={questionName}
            onChange={(event) => {
              setQuestionName(event.target.value);
            }}
          />
        </div>

        {answerList.map((answer, index) => (
          <div key={index}>
            <AnswerItem
              checked={answer.isCorrectAnswer}
              value={answer.answerName}
              name={"answer"}
              inputId={"answer1"}
              index={index}
              handleClick={removeAnswer}
              handleChange={handleInputChange}
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
