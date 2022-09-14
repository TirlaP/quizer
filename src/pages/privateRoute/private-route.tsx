import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import { LoginStore } from "../../features/authentication/login/store/LoginStore";

export type ProtectedRouteProps = {
  isAuthenticated: any;
  authenticationPath: string;
  component: JSX.Element;
};

export const PrivateRoute = observer(
  ({ isAuthenticated, authenticationPath, component }: ProtectedRouteProps) => {
    return isAuthenticated ? (
      component
    ) : (
      <Navigate to={{ pathname: authenticationPath }} />
    );
  }
);
