import { ComponentType } from "react";
import { Navigate } from "react-router-dom";

import { Role } from "./Router";
import { userStore } from "../store/userStore";

interface PrivateRouteProps {
  element: ComponentType;
  roles: Role[];
}

const PrivateRoute = ({ element: Element, roles }: PrivateRouteProps) => {
  const { role, logInUser } = userStore();

  return logInUser && roles.includes(role as Role) ? (
    <Element />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
