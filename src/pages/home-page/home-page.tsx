import React, { useEffect, useState } from "react";
import { NoQuizzes } from "../no-quizzes-page/no-quizzes";
import { QuizList } from "../quiz-list-page/quiz-list-page";

import "../../styles/buttons.scss";
import "./home-page.scss";
import { Layout } from "../layout-page/layout";
import { QuizStore } from "../../features/create-quiz/store/CreateQuizStore";
import { toJS } from "mobx";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { LoadingScreen } from "../../common/components/loading-screen/loading-screen";
import { LoginStore } from "../../features/authentication/login/store/LoginStore";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = () => {
  const quizzesCollectionRef = collection(db, "quizzes");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuizzes = async () => {
      const fetchedQuizzes = query(
        quizzesCollectionRef,
        where(
          "creatorId",
          `${LoginStore.login.user.isAdmin ? "==" : "!="}`,
          LoginStore.login.user.isAdmin ? LoginStore.login.user.uid : ""
        )
      );
      const querySnapshot = await getDocs(fetchedQuizzes);
      const fetchedData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      QuizStore.setQuizzes(fetchedData);

      setLoading(false);
    };

    getQuizzes();
  }, []);

  const verifyHomePageRender = () => {
    return QuizStore.quizzes.length > 0 ? <QuizList /> : <NoQuizzes />;
  };

  return (
    <div className="button home-page">
      <Layout>
        {loading ? <LoadingScreen loading /> : verifyHomePageRender()}
      </Layout>
    </div>
  );
};
