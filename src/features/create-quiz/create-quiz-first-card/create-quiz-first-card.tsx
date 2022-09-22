import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";

import { observer } from "mobx-react";
import { QuestionItem, QuizStore } from "../store/CreateQuizStore";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../config/firebase-config";
export interface InputErrors {
  [key: string]: string;
}

export const CreateQuizFirstCard: React.FC = observer(() => {
  const toast = useRef<Toast>(null);

  const [quizName, setQuizName] = useState("");
  const [quizQuestions, setQuizQuestions] = useState<QuestionItem[]>([]);

  const showSuccess = (message: string) => {
    if (toast) {
      toast.current?.show({
        severity: "success",
        summary: "Success Message",
        detail: `${message}`,
        life: 3000,
      });
    }
  };

  const showError = () => {
    toast.current?.show({
      severity: "error",
      summary: "Error Message",
      detail: "Message Content",
      life: 3000,
    });
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
              <Button type="button" label="Yes" className="p-button-success" />
            </div>
            <div className="col-6">
              <Button type="button" label="No" className="p-button-secondary" />
            </div>
          </div>
        </div>
      ),
    });
  };

  const handleFirebaseAdd = async () => {
    try {
      if (quizQuestions.length > 0) {
        await addDoc(collection(db, "quizzes"), {
          quiz: { quizName, quizQuestions },
          timeStamp: serverTimestamp(),
        });
        showSuccess("Quiz has been created successfuly.");
        console.log("Succes add");
      } else {
        console.log("No questions");
        showError();
      }
    } catch (err) {
      console.log(err);
      showError();
    }
  };

  const initialValues = {
    quizName: "",
  };

  const formik: any = useFormik({
    initialValues,

    validate: (data) => {
      let errors: InputErrors = {} as InputErrors;

      if (!data.quizName) {
        errors.quizName = "Quiz name is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      if (Object.keys(formik.errors).length === 0) {
        handleFirebaseAdd();

        data.quizName = "";
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
    setQuizQuestions(QuizStore.questions);
  }, [QuizStore.questions]);

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
              <h2 className="create-quiz__title">New quiz</h2>
              <p className="create-quiz__subtitle">
                Create a new quiz or check back on the ones that are already
                created.
              </p>
            </div>
            <div className="create-quiz__button-wrapper">
              <Button
                onClick={showConfirm}
                label="Cancel"
                className="button__common-style button__create-quiz-cancel"
              />
              <Button
                type="submit"
                label="Create quiz"
                className="button__common-style button__create-quiz-create"
              />
            </div>
          </div>
          <div className="flex flex-column align-items-start">
            <div className="create-quiz__input-label">Quiz name</div>
            <InputText
              id="quizName"
              className={`create-quiz__input ${
                isFormFieldValid("quizName") ? "create-quiz__input-error" : ""
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
