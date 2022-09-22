import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { AnswerItem } from "./components/answer-item";

import { observer } from "mobx-react";
import { QuizStore } from "../store/CreateQuizStore";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../config/firebase-config";
import { toJS } from "mobx";

export interface Question {
  answerList: AnswersList[];
  questionName?: string;
  questionType: string | null;
}
export interface InputErrors {
  [key: string]: string;
}

export interface AnswersList {
  isCorrectAnswer?: boolean;
  answerName: string;
}

export const CreateQuizSecondCard: React.FC = observer(() => {
  const [radio, setRadio] = useState<number | null>(null);
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

  const handleAnswerInputChange = (value: any, index: number) => {
    const newList = answerList;
    newList[index].answerName = value;
    formik.values.answerList = [...newList];
    setAnswerList([...newList]);
  };

  const addAnswer = () => {
    const newList = answerList;
    newList.push({ isCorrectAnswer: false, answerName: "" });
    formik.values.answerList = [...newList];
    setAnswerList([...newList]);
  };

  const removeAnswer = (index: number) => {
    let newList = answerList.filter((_, answerIndex) => answerIndex !== index);
    setAnswerList([...newList]);
  };

  const handleFirebaseAdd = async () => {
    try {
      await addDoc(collection(db, "questions"), {
        question: { ...formik.values, answerList, radio },
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

      if (!data.questionType) {
        errors.questionType = "Question type is required.";
      }

      if (!data.questionName) {
        errors.questionName = "Question name is required.";
      }

      data.answerList?.map((answer, index) => {
        if (!answer.answerName) {
          errors[`answerInput${index}`] = "Answer name is required.";
        }
      });

      return errors;
    },
    onSubmit: (data) => {
      if (Object.keys(formik.errors).length === 0) {
        if (QuizStore.selectedQuestionID) {
          QuizStore.editQuestion(QuizStore.selectedQuestionID, {
            ...formik.values,
            answerList,
          });
          handleFirebaseAdd();
        } else {
          QuizStore.addQuestion({ ...formik.values, answerList }, radio);
        }

        data.questionName = "";
        formik.values.questionType = "";
        setAnswerList([
          {
            isCorrectAnswer: false,
            answerName: "",
          },
        ]);
      }

      formik.resetForm();
    },
  });

  const isFormFieldValid = (name: any) => {
    if (name.toLowerCase().includes("answer".toLocaleLowerCase())) {
      return !!formik.errors[name];
    } else {
      return !!(formik.errors[name] && formik.touched[name]);
    }
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
    if (QuizStore.selectedQuestion) {
      setAnswerList(QuizStore.selectedQuestion.question?.answerList || []);
      formik.values.answerList =
        QuizStore.selectedQuestion?.question?.answerList;
    }

    formik.values.questionType = toJS(
      QuizStore.selectedQuestion?.question?.questionType
    );
    if (QuizStore.selectedQuestionID) {
      formik.values.questionName =
        QuizStore.selectedQuestion?.question?.questionName;
    }
  }, [QuizStore.selectedQuestionID]);

  const QuestionHeaderCard = (
    <div className="flex flex-row align-items-center justify-content-between">
      <div className="create-quiz__title-wrapper">
        <h2 className="create-quiz__title">
          {QuizStore.selectedQuestionID ? "Edit question" : "New question"}
        </h2>
      </div>
      <div className="flex flex-column align-items-start">
        <Dropdown
          id="questionType"
          name="questionType"
          value={formik.values.questionType}
          options={questionTypes}
          onChange={formik.handleChange}
          optionLabel="name"
          className={`create-quiz__dropdown ${
            isFormFieldValid("questionType") ? "create-quiz__input-error" : ""
          }`}
          placeholder="Question type"
        />
        {getFormErrorMessage("questionType")}
      </div>
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
                className={`create-quiz__input-label ${
                  isFormFieldValid("questionName") ? "" : "p-error"
                }`}
              >
                Question*
              </label>
              <InputText
                id="questionName"
                style={{ width: "640px" }}
                className={`create-quiz__input ${
                  isFormFieldValid("questionName")
                    ? "create-quiz__input-error"
                    : ""
                }`}
                placeholder="What is your question?"
                value={formik.values.questionName}
                onChange={formik.handleChange}
              />
              {getFormErrorMessage("questionName")}
            </div>

            {answerList.map((answer, index) => (
              <div key={index}>
                <AnswerItem
                  checked={answer.isCorrectAnswer || false}
                  name={`answerInput${index}`}
                  inputId={`answer${index + 1}`}
                  index={index}
                  value={answer.answerName}
                  handleChange={handleAnswerInputChange}
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
              />
            </div>
          </div>
        </form>
      </Card>
    </>
  );
});
