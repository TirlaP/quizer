import { onAuthStateChanged } from "firebase/auth";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAdminRoute: boolean;
  authenticationPath: string;
  component: JSX.Element;
};

export const PrivateRoute = observer(
  ({
    isAuthenticated,
    isAdmin,
    isAdminRoute,
    authenticationPath,
    component,
  }: ProtectedRouteProps) => {
    if (isAuthenticated) {
      if (isAdminRoute) {
        return isAdmin ? (
          component
        ) : (
          <Navigate to={{ pathname: "/homepage" }} />
        );
      } else {
        return <Navigate to={{ pathname: "/homepage" }} />;
      }
    } else {
      return <Navigate to={{ pathname: authenticationPath }} />;
    }
  }
);
