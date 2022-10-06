import React, { useEffect } from "react";
import "./create-quiz.scss";
import "../../styles/buttons.scss";
import { CreateQuizFirstCard } from "../../features/create-quiz/create-quiz-first-card/create-quiz-first-card";
import { CreateQuizSecondCard } from "../../features/create-quiz/create-quiz-second-card/create-quiz-second-card";
import { QuestionList } from "../../features/create-quiz/create-quiz-question-list/question-list";
import { QuizStore } from "../../features/create-quiz/store/CreateQuizStore";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase-config";

import { useSearchParams } from "react-router-dom";
import { Layout } from "../layout-page/layout";

interface CreateQuizProps {}

export const CreateQuiz: React.FC<CreateQuizProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const quizId = searchParams.get("quizId");

    // Check for any selected quiz
    if (quizId) {
      const docRef = doc(db, "quizzes", quizId);

      getDoc(docRef).then((doc) => {
        QuizStore.addQuiz({
          ...doc.data(),
          id: doc.id,
        });
        QuizStore.selectQuiz(quizId, "edit");
      });
    } else {
      // Add empty question item on refresh of "New quiz" page
      if (!QuizStore.isAnyEmptyQuestion) {
        QuizStore.addEmptyQuestion();
      }
    }
    return () => {
      QuizStore.deselectQuiz();
    };
  }, []);

  return (
    <div className="create-quiz flex flex-column button mb-5">
      <Layout>
        <CreateQuizFirstCard />

        <div className="flex flex-row card--center mt-6 gap-3 create-quiz__bottom-section">
          <CreateQuizSecondCard />

          <QuestionList />
        </div>
      </Layout>
    </div>
  );
};
