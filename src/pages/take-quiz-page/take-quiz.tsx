import { doc, getDoc } from "firebase/firestore";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "../../config/firebase-config";
import { QuizStore } from "../../features/create-quiz/store/CreateQuizStore";
import { Layout } from "../layout-page/layout";

import "./take-quiz-page.scss";

interface TakeQuizProps {}

export const TakeQuiz: React.FC<TakeQuizProps> = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [questions, setQuestions] = useState([]);
  const [quizName, setQuizName] = useState([]);

  const [index, setIndex] = useState(0);

  function nextElement() {
    setIndex(index + 1);
  }
  function previousElement() {
    setIndex(index - 1);
  }

  useEffect(() => {
    const quizId = "B28y0uPGzzQJZ5YJBbLh";

    // Check for any selected quiz
    const docRef = doc(db, "quizzes", quizId);

    getDoc(docRef).then((doc) => {
      QuizStore.addQuiz({
        ...doc.data(),
        id: doc.id,
      });
      QuizStore.selectQuiz(quizId);
      console.log(doc.data()?.quiz);
      setQuizName(doc.data()?.quiz.quizName);
      setQuestions(doc.data()?.quiz.quizQuestions);
    });
    return () => {
      QuizStore.deselectQuiz();
    };
  }, []);

  function getElements(questions: any, index: number) {
    return questions.slice(index, index + 1).map((question: any) => {
      return (
        <Card key={index} className="take-quiz__card">
          <div className="take-quiz__content-wrapper flex flex-column gap-8">
            <div className="take-quiz__header flex flex-column align-items-start">
              <h2>{quizName}</h2>
              <span className="flex text-left">
                You were invited to take part of this awesome quiz. Read
                carefully the questions below and give your best shot.
              </span>
            </div>
            <div className="flex flex-column gap-3 align-items-start">
              <div className="take-quiz__question-name">
                {`${index + 1}. ${question?.question?.questionName}`}
              </div>
              {question?.question.answerList.map((answer: any) => (
                <div className="take-quiz__question-response">
                  {answer.answerName}
                </div>
              ))}
            </div>
            <div className="take-quiz__footer flex flex-row justify-content-between">
              <Button disabled={index === 0} onClick={previousElement}>
                Previous
              </Button>
              <Button
                disabled={index === questions.length - 1}
                onClick={nextElement}
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      );
    });
  }

  return (
    <div className="take-quiz">
      <Layout>
        <div className="flex align-items-center justify-content-center mt-8">
          {/* <button onClick={addElement}>Add item</button> */}
          {getElements(questions, index)}
        </div>
      </Layout>
    </div>
  );
};
