import React from "react";
import { ColloredCircles } from "../../../common/components/collored-circles/collored-circles";
import { ForgotPasswordForm } from "../../../features/authentication/forgot_password/forgotPassword";

interface ForgotPasswordProps {}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  return (
    <div>
      <ForgotPasswordForm />
      <ColloredCircles />
    </div>
  );
};
