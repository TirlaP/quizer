import { useFormik, Field } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import { AnswerItem } from "./components/answer-item";

import { observer } from "mobx-react";
import { QuizStore } from "../store/CreateQuizStore";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../config/firebase-config";

interface InitialValues {
  answerList: AnswersList[];
  questionTypeSelect: string | null;
  questionInput: string;
}
export interface Question {
  answerList: AnswersList[];
  questionName: string;
  questionType: string | null;
}
export interface InputErrors {
  [key: string]: string;
}

export interface AnswersList {
  isCorrectAnswer?: boolean;
  answerName: string;
}

/**
 * 

InputErrors {
[K in string]: string
}

`answer${index}`

errors = {answer1: "error message"}

 */

export const CreateQuizSecondCard: React.FC = observer(() => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [questionName, setQuestionName] = useState<string>("");
  const [questionType, setQuestionType] = useState(null);
  const [radio, setRadio] = useState<number | null>(null);
  const [formData, setFormData] = useState<InitialValues | null>(null);
  const [answerList, setAnswerList] = useState<AnswersList[]>([
    {
      isCorrectAnswer: true,
      answerName: "",
    },
  ]);

  const questionTypes = [
    { name: "Multiple answers" },
    { name: "Single answer" },
    { name: "Subjective" },
  ];

  const handleRadioChange = (id: number) => {
    setRadio(id);
  };

  const onTypeChange = (e: { value: any }) => {
    setQuestionType(e.value);
  };

  const handleInputChange = (value: any, index: number) => {
    const newList = answerList;
    newList[index].answerName = value;
    console.log(newList);
    formik.values.answerList = [...newList];
    setAnswerList(newList);
  };

  const addAnswer = () => {
    const newList = answerList;
    newList.push({ isCorrectAnswer: false, answerName: "" });
    formik.values.answerList = [...newList];
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

  const initialValues: Question = {
    answerList: [
      {
        isCorrectAnswer: true,
        answerName: "",
      },
    ],
    questionName: "",
    questionType: "",
  };

  const formik: any = useFormik({
    initialValues,

    validate: (data) => {
      let errors: InputErrors = {} as InputErrors;

      // if (!data.questionTypeSelect) {
      //   errors.questionTypeSelect = "Question type is required.";
      // }

      if (!data.questionName) {
        errors.questionName = "Question name is required.";
      }
      console.log(formik.errors);

      // errors.answerList = [] as AnswersList[];
      data.answerList.map((answer, index) => {
        if (!answer.answerName) {
          errors[`answerInput${index}`] = "Answer name is required.";
        }
        // errors.answerList.push({
        //   answerName: `${answer.answerName ? "" : "Answer name is required."}`,
        // });
      });

      return errors;
    },
    onSubmit: (data) => {
      console.log(data);
      if (Object.keys(formik.errors).length === 0) {
        QuizStore.addQuestion({ ...formik.values, answerList }, radio);
        setQuestionName("");
      }

      formik.resetForm();
    },
  });

  const isFormFieldValid = (name: any) => {
    return !!formik.errors[name];
  };

  const getFormErrorMessage = (name: any) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  useEffect(() => {
    formik.values.answerList.map((answer: any, index: number) =>
      index === radio
        ? (answer.isCorrectAnswer = true)
        : (answer.isCorrectAnswer = false)
    );
  }, [radio]);

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
        onChange={onTypeChange}
        optionLabel="name"
        className="create-quiz__dropdown"
        placeholder="Question type"
      />
    </div>
  );

  return (
    <>
      <Card
        header={QuestionHeaderCard}
        className="create-quiz__second-card create-quiz__common-card-style"
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-column align-items-start create-quiz__answers-wrapper">
            <div className="create-quiz__answer">
              <label
                htmlFor="question"
                className={`create-quiz__input-label ${classNames({
                  " p-error": isFormFieldValid("questionName"),
                })}`}
              >
                Question*
              </label>
              <InputText
                id="questionName"
                style={{ width: "640px" }}
                className="create-quiz__input"
                placeholder="What is your question?"
                value={formik.values.questionName}
                onChange={formik.handleChange}
              />
              {getFormErrorMessage("questionName")}
            </div>

            {answerList.map((answer, index) => (
              <div key={index}>
                <AnswerItem
                  checked={radio === index}
                  name={`answerInput${index}`}
                  inputId={`answer${index + 1}`}
                  index={index}
                  value={formik.values.answerInput}
                  handleChange={handleInputChange}
                  handleClick={removeAnswer}
                  getError={(inputName: string) =>
                    getFormErrorMessage(inputName)
                  }
                  formValidation={isFormFieldValid}
                  handleRadioChange={handleRadioChange}
                />
              </div>
            ))}

            <div className="create-quiz__answer">
              <Button
                type="button"
                label="Add answer"
                className="button__common-style button__create-quiz-add"
                onClick={addAnswer}
              />
            </div>
          </div>

          <div className="flex flex-row justify-content-between create-quiz__footer-buttons mt-4">
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
                type="submit"
                label="Save"
                className="button__common-style button__create-quiz-save"
                onClick={(event) => {}}
              />
            </div>
          </div>
        </form>
      </Card>
    </>
  );
});
