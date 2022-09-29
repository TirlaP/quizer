import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { AnswerItem } from "./components/answer-item";

import { observer } from "mobx-react";
import { QuizStore } from "../store/CreateQuizStore";

import { toJS } from "mobx";

import {
  IQuestion,
  IInputErrors,
  IAnswersList,
} from "../../../common/models/model";
import { isFormFieldValid } from "../../../common/services/util-service";
import { ValidationSchema } from "./validation-schema";

export const CreateQuizSecondCard: React.FC = observer(() => {
  const [answerList, setAnswerList] = useState<IAnswersList[]>([
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

  const handleAnswerInputChange = (value: any, index: number) => {
    const newList = [...answerList];
    newList[index].answerName = value;
    formik.values.answerList = [...newList];
    setAnswerList(newList);
  };

  const addAnswer = () => {
    const newList = [...answerList];
    newList.push({ isCorrectAnswer: false, answerName: "" });
    formik.values.answerList = [...newList];
    setAnswerList(newList);
  };

  const removeAnswer = (index: number) => {
    let newList = [...answerList];
    newList.splice(index, 1);
    setAnswerList(newList);
  };

  const initialValues: IQuestion = {
    answerList: [
      {
        isCorrectAnswer: false,
        answerName: "",
      },
    ],
    questionName: "",
    questionType: "",
  };

  const formik: any = useFormik({
    initialValues,

    validate: (data) => {
      let errors: IInputErrors = {} as IInputErrors;
      let isAnyButtonChecked = false;

      data.answerList?.map((answer, index) => {
        if (!answer.answerName) {
          errors[`answerInput${index}`] = "Answer name is required!";
        }
        if (answer.isCorrectAnswer) {
          isAnyButtonChecked = true;
        }
      });

      if (!isAnyButtonChecked) {
        if (formik.values.questionType.name === "Single answer") {
          errors["answerRadio"] = "Correct answer check is required!";
        } else if (formik.values.questionType.name === "Multiple answers") {
          errors["answerRadio"] =
            "At least one correct answer check is required!";
        }
      }

      return errors;
    },
    onSubmit: (data) => {
      if (Object.keys(formik.errors).length === 0) {
        if (QuizStore.selectedQuestionID) {
          QuizStore.editQuestion(QuizStore.selectedQuestionID, {
            ...formik.values,
            answerList,
          });
          if (!QuizStore.selectedQuestionIsEmpty) {
            QuizStore.addEmptyQuestion();
          }
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
    validationSchema: ValidationSchema,
  });

  const getFormErrorMessage = (name: any) => {
    return (
      isFormFieldValid(name, formik) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const changeCheckedAnswer = (index: number) => {
    if (formik.values.questionType.name === "Single answer") {
      setAnswerList((currentState) => {
        let arrayCopy = [...currentState];
        arrayCopy = arrayCopy.map((answer, i) => {
          if (i === index) {
            return {
              ...answer,
              isCorrectAnswer: !answer.isCorrectAnswer,
            };
          } else {
            return {
              ...answer,
              isCorrectAnswer: false,
            };
          }
        });
        return arrayCopy;
      });
    } else if (formik.values.questionType.name === "Multiple answers") {
      setAnswerList((currentState) => {
        let arrayCopy = [...currentState];
        arrayCopy[index].isCorrectAnswer = !arrayCopy[index].isCorrectAnswer;
        return arrayCopy;
      });
    }
  };

  useEffect(() => {
    if (QuizStore.selectedQuestion) {
      setAnswerList(
        toJS(QuizStore.selectedQuestion.question?.answerList) || []
      );
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

  useEffect(() => {
    if (QuizStore.selectedQuiz) {
      QuizStore.questions = QuizStore.selectedQuiz?.quiz.quizQuestions;

      QuizStore.addEmptyQuestion();

      // Automatically select first question when enter the "Edit-page"
      QuizStore.selectQuestion(QuizStore.questions[0]);
    }
  }, [QuizStore.selectedQuizID]);

  const QuestionHeaderCard = (
    <div className="flex flex-row align-items-center justify-content-between">
      <div className="create-quiz__title-wrapper">
        <h2 className="create-quiz__title">
          {QuizStore.selectedQuestionID && !QuizStore.selectedQuestionIsEmpty
            ? "Edit question"
            : "New question"}
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
            isFormFieldValid("questionType", formik)
              ? "create-quiz__input-error"
              : ""
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
                  isFormFieldValid("questionName", formik) ? "" : "p-error"
                }`}
              >
                Question*
              </label>
              <InputText
                id="questionName"
                style={{ width: "640px" }}
                className={`create-quiz__input ${
                  isFormFieldValid("questionName", formik)
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
                  handleAnswerCheckChange={changeCheckedAnswer}
                  questionType={formik.values.questionType}
                />
              </div>
            ))}
            {getFormErrorMessage("answerRadio")}

            <div className="create-quiz__answer">
              <Button
                type="button"
                label="Add answer"
                className="button__common-style button__create-quiz-add"
                onClick={() => addAnswer()}
              />
            </div>
          </div>

          <div className="flex flex-row justify-content-between create-quiz__footer-buttons mt-4">
            <div>
              {QuizStore.questions.length > 1 && (
                <Button
                  style={{ width: "167px" }}
                  label="Remove"
                  className="button__common-style button__create-quiz-remove"
                />
              )}
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
