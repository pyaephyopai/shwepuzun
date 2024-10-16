import { ComponentType } from "react";
import { Navigate } from "react-router-dom";

import { userStore } from "../store/userStore";

interface PublicRouteProps {
  element: ComponentType;
}

const PublicRoute = ({ element: Element }: PublicRouteProps) => {
  const { logInUser, token } = userStore();
  const path = location.pathname.split(/\//g);

  if (logInUser && (path.includes("login") || path.includes("register"))) {
    return (location.href = "/not-found");
  }

  return !logInUser && !!token ? <Navigate to="/" /> : <Element />;
};

export default PublicRoute;
