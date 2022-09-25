import React, { useEffect, useState } from "react";
import { WelcomeMessage } from "../../common/components/homepage/welcome-message/welcome-message";

import "../no-quizzes-page/no-quizzes.scss";
import "./quiz-list-page.scss";
import clock_icon from "../../common/assets/clock-icon.svg";
import file_icon from "../../common/assets/paper-icon.svg";
import edit_icon from "../../common/assets/edit-icon.svg";
import sword_icon from "../../common/assets/sword_icon.png";

import { Button } from "primereact/button";
import { QuizCard } from "../../common/components/homepage/quiz-card/quiz-card";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import { LoginStore } from "../../features/authentication/login/store/LoginStore";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { QuizStore } from "../../features/create-quiz/store/CreateQuizStore";
import { toJS } from "mobx";

interface QuizListProps {}

export const QuizList: React.FC<QuizListProps> = () => {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState<{ [key: string]: any }[]>([]);
  const quizzesCollectionRef = collection(db, "quizzes");

  const { user } = LoginStore.login;

  const convertTimeStampToDate = (timeStamp: number) => {
    let date = new Date(timeStamp * 1000);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const getQuizzes = async () => {
      const fetchedQuizzes = await getDocs(quizzesCollectionRef);
      const fetchedData = fetchedQuizzes.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setQuizzes(fetchedData);
      QuizStore.setFetchedFirebaseQuizzes(fetchedData);
    };

    getQuizzes();
  }, []);

  useEffect(() => {
    console.log(quizzes);
    QuizStore.setFetchedFirebaseQuizzes(quizzes);
  }, [quizzes]);

  return (
    <div className="no-quizzes quiz-list">
      <div className="no-quizzes__content-wrapper flex flex-column gap-6">
        <div className="flex flex-row align-items-center justify-content-between">
          <WelcomeMessage />
          <Button
            label="Create quiz"
            className="button__common-style button__create-quiz-create"
            onClick={() => navigate("/create-quiz")}
          />
        </div>
        <div className="quiz-list__card-row">
          {quizzes.map((quiz, index) => (
            <Card
              key={index}
              className="quiz-list__card quiz-list__card-column"
              onClick={() => QuizStore.selectQuiz(quiz.id)}
            >
              <div className="quiz-list__card-wrapper">
                <div className="quiz-list__card-header">
                  <div className="flex flex-column align-items-start">
                    <h2>{quiz?.quiz?.quizName || "Untitled quiz"}</h2>
                    <div className="flex flex-row align-items-center gap-3">
                      <span className="flex flex-row align-items-center gap-2">
                        <img src={clock_icon} alt="clock_icon" />
                        {convertTimeStampToDate(quiz?.timeStamp?.seconds)}
                      </span>
                      <span className="flex flex-row align-items-center gap-2">
                        <img src={file_icon} alt="file_icon" />
                        {quiz?.quiz?.quizQuestions.length} questions
                      </span>
                    </div>
                  </div>
                </div>

                <div className="quiz-list__card-footer">
                  <Button
                    className="button__common-style button__edit-quiz"
                    onClick={() => {
                      navigate("/create-quiz");
                    }}
                  >
                    <img
                      src={user.isAdmin ? edit_icon : sword_icon}
                      alt="edit_icon"
                      width="30px"
                    />
                    <span className="px-3">
                      {user.isAdmin ? "Edit" : "Take"}
                    </span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
