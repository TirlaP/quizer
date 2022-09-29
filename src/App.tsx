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
import { LoadingScreen } from "./common/components/loading-screen/loading-screen";
import { Layout } from "./pages/layout-page/layout";

export const App: React.FC = observer(() => {
  let defaultProtectedRouteProps: Omit<
    ProtectedRouteProps,
    "isAdminRoute" | "component"
  > = {
    isAuthenticated: LoginStore.login?.isAuthenticated,
    isAdmin: LoginStore.login.user?.isAdmin,
    authenticationPath: "/login",
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAuth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        currentUser.getIdTokenResult().then((idTokenResult) => {
          const isAdmin = !!idTokenResult.claims.admin;
          LoginStore.loginSucces({ ...currentUser, isAdmin });
        });
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="home-page">
          <Layout>
            <LoadingScreen loading />
          </Layout>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/quiz-list" element={<QuizList />} />
          <Route
            path="/create-quiz"
            element={
              <PrivateRoute
                {...defaultProtectedRouteProps}
                isAdminRoute={true}
                component={<CreateQuiz />}
              />
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute
                {...defaultProtectedRouteProps}
                isAdminRoute={false}
                component={<LandingPage />}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
});

export default App;
