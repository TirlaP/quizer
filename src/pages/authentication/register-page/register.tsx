import React from "react";
import { ColloredCircles } from "../../../common/components/collored-circles/collored-circles";
import { RegisterForm } from "../../../features/authentication/register/register";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({}) => {
  return (
    <div>
      <RegisterForm />
      <ColloredCircles />
    </div>
  );
};
