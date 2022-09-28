import { getAuth } from "firebase/auth";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { LoginStore } from "./features/authentication/login/store/LoginStore";
import { ForgotPassword } from "./pages/authentication/forgot-password-page/forgot-password";
import { Login } from "./pages/authentication/login-page/login";
import { Register } from "./pages/authentication/register-page/register";
import { HomePage } from "./pages/home-page/home-page";
import { LandingPage } from "./pages/landing-page/landing-page";
import {
  PrivateRoute,
  ProtectedRouteProps,
} from "./pages/private-route/private-route";
import { observer } from "mobx-react-lite";
import { CreateQuiz } from "./pages/create-quiz-page/create-quiz";
import { QuizList } from "./pages/quiz-list-page/quiz-list-page";

export const App: React.FC = observer(() => {
  let defaultProtectedRouteProps: Omit<ProtectedRouteProps, "component"> = {
    isAuthenticated: LoginStore.login.isAuthenticated,
    authenticationPath: "/login",
  };

  useEffect(() => {
    getAuth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        currentUser.getIdTokenResult().then((idTokenResult) => {
          const isAdmin = !!idTokenResult.claims.admin;
          LoginStore.loginSucces({ ...currentUser, isAdmin });
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/quiz-list" element={<QuizList />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route
          path="/"
          element={
            <PrivateRoute
              {...defaultProtectedRouteProps}
              component={<LandingPage />}
            />
          }
        />
      </Routes>
    </div>
  );
});

export default App;
