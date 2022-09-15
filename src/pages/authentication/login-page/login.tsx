import React from "react";
import { LoginForm } from "../../../features/authentication/login/login";
import { ColloredCircles } from "../../../common/components/collored-circles/collored-circles";

export const Login: React.FC = () => {
  return (
    <div>
      <LoginForm />
      <ColloredCircles />
    </div>
  );
};
