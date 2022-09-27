import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";

import { observer } from "mobx-react";
import { QuizStore } from "../store/CreateQuizStore";
import { toJS } from "mobx";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase-config";
import { IInputErrors } from "../../../common/models/model";
import {
  isFormFieldValid,
  showSuccess,
  showError,
} from "../../../common/services/util-service";

export const CreateQuizFirstCard: React.FC = observer(() => {
  const navigate = useNavigate();

  const toast = useRef<Toast>(null);

  const [quizName, setQuizName] = useState("");

  const handleCancel = () => {
    QuizStore.deselectQuiz();
    navigate("/homepage");
  };

  const showConfirm = () => {
    toast.current?.show({
      severity: "warn",
      sticky: true,
      content: (
        <div className="flex flex-column" style={{ flex: "1" }}>
          <div className="text-center">
            <i
              className="pi pi-exclamation-triangle"
              style={{ fontSize: "3rem" }}
            ></i>
            <h4>Are you sure you want to cancel?</h4>
            <p>Confirm to proceed</p>
          </div>
          <div className="grid p-fluid">
            <div className="col-6">
              <Button
                type="button"
                label="Yes"
                className="p-button-success"
                onClick={handleCancel}
              />
            </div>
            <div className="col-6">
              <Button
                type="button"
                label="No"
                className="p-button-secondary"
                onClick={() => {
                  toast.current?.clear();
                }}
              />
            </div>
          </div>
        </div>
      ),
    });
  };

  const handleFirebaseCrudMethod = async (methodType: string) => {
    const quizzesCollectionRef = collection(db, "quizzes");

    try {
      if (QuizStore.questions.length > 1) {
        methodType === "add"
          ? await addDoc(quizzesCollectionRef, {
              quiz: {
                quizName,
                quizQuestions: toJS(QuizStore.questions.slice(0, -1)),
              },
              timeStamp: serverTimestamp(),
            })
          : await updateDoc(doc(db, "quizzes", QuizStore.selectedQuiz?.id), {
              quiz: {
                quizName,
                quizQuestions: toJS(QuizStore.questions.slice(0, -1)),
              },
              timeStamp: serverTimestamp(),
            });
        showSuccess(
          `Quiz has been ${
            methodType === "add" ? "created" : "updated"
          } successfuly.`,
          toast
        );
        navigate("/homepage");
      } else {
        console.log("No questions");
        showError("No questions", toast);
      }
    } catch (err) {
      console.log(err);
      showError("Other error", toast);
    }
  };

  const initialValues = {
    quizName: "",
  };

  const formik: any = useFormik({
    initialValues,

    validate: (data) => {
      let errors: IInputErrors = {} as IInputErrors;

      if (!data.quizName) {
        errors.quizName = "Quiz name is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      if (Object.keys(formik.errors).length === 0) {
        if (QuizStore.selectedQuizID) {
          handleFirebaseCrudMethod("update");
          QuizStore.deselectQuiz();
        } else {
          handleFirebaseCrudMethod("add");
        }
      }
      data.quizName = "";

      formik.resetForm();
    },
  });

  const getFormErrorMessage = (name: any) => {
    return (
      isFormFieldValid(name, formik) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  useEffect(() => {
    setQuizName(formik.values.quizName);
  }, [formik.values.quizName]);

  useEffect(() => {
    if (QuizStore.selectedQuiz) {
      formik.values.quizName = QuizStore.selectedQuiz.quiz.quizName;
    }
  }, [QuizStore.selectedQuizID]);

  return (
    <div className="card--center mt-6">
      <Toast ref={toast} />
      <Card className="create-quiz__first-card create-quiz__common-card-style">
        <form
          onSubmit={formik.handleSubmit}
          className="create-quiz__first-card-form"
        >
          <div className="flex flex-row align-items-center justify-content-between">
            <div className="create-quiz__title-wrapper">
              <h2 className="create-quiz__title">
                {QuizStore.selectedQuizID ? "Edit quiz" : "New quiz"}
              </h2>
              <p className="create-quiz__subtitle">
                Create a new quiz or check back on the ones that are already
                created.
              </p>
            </div>
            <div className="create-quiz__button-wrapper">
              <Button
                onClick={showConfirm}
                type="button"
                label="Cancel"
                className="button__common-style button__create-quiz-cancel"
              />
              <Button
                type="submit"
                label={QuizStore.selectedQuizID ? "Update quiz" : "Create quiz"}
                className="button__common-style button__create-quiz-create"
              />
            </div>
          </div>
          <div className="flex flex-column align-items-start">
            <div className="create-quiz__input-label">Quiz name</div>
            <InputText
              id="quizName"
              className={`create-quiz__input ${
                isFormFieldValid("quizName", formik)
                  ? "create-quiz__input-error"
                  : ""
              }`}
              placeholder="Enter quiz name"
              value={formik.values.quizName}
              onChange={formik.handleChange}
            />
            {getFormErrorMessage("quizName")}
          </div>
        </form>
      </Card>
    </div>
  );
});
