import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Header } from "./common/components/header/header";
import { LoginStoreImplementation } from "./features/authentication/login/store/LoginStore";
import { Login } from "./pages/authentication/login-page/login";
import { Register } from "./pages/authentication/register-page/register";
import { HomePage } from "./pages/home-page/home-page";

interface AppProps {
  loginStore: LoginStoreImplementation;
}

export const App: React.FC<AppProps> = ({ loginStore }) => {
  useEffect(() => {
    console.log(loginStore.login.authenticated);
    console.log(loginStore.login.user);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Login />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      {/* {!loginStore.login.authenticated && <Login />}
      {loginStore.login.authenticated && <Header />} */}
    </div>
  );
};

export default App;
