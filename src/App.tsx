import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase-config";

import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Header } from "./common/components/header/header";
import { LoginStoreImplementation } from "./features/authentication/login/store/LoginStore";
import { ForgotPassword } from "./pages/authentication/forgot-password-page/forgot-password";
import { Login } from "./pages/authentication/login-page/login";
import { Register } from "./pages/authentication/register-page/register";
import { HomePage } from "./pages/home-page/home-page";
import { LandingPage } from "./pages/landing-page/landing-page";
import PrivateRoute, {
  ProtectedRouteProps,
} from "./pages/privateRoute/private-route";

interface AppProps {
  loginStore: LoginStoreImplementation;
}

export const App: React.FC<AppProps> = ({ loginStore }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "component"> = {
    isAuthenticated,
    authenticationPath: "/login",
  };

  useEffect(() => {
    const isAuth = JSON.parse(localStorage.getItem("authenticated") || "false");

    if (isAuth === true) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/homepage" element={<HomePage />} />
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
};

export default App;
