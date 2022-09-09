import React from "react";
import { LoginForm } from "../../../features/authentication/login/login";
import { LoginStore } from "../../../features/authentication//login/store/LoginStore";
import { ColloredCircles } from "../../../common/components/collored-circles/collored-circles";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  return (
    <div>
      <LoginForm loginStore={LoginStore} />
      <ColloredCircles />
    </div>
  );
};
