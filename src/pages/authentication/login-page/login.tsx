import React from "react";
import { LoginForm } from "../../../features/authentication/login/login";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};
