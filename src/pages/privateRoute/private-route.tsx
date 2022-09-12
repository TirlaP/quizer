import React from "react";
import { Navigate } from "react-router-dom";

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  component: JSX.Element;
};

export default function PrivateRoute({
  isAuthenticated,
  authenticationPath,
  component,
}: ProtectedRouteProps) {
  return isAuthenticated ? (
    component
  ) : (
    <Navigate to={{ pathname: authenticationPath }} />
  );
}
