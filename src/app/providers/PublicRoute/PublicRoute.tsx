import { Navigate, Outlet } from "react-router-dom";

import { useHealthCheckQuery } from "@shared/api-queries";
import { useAuthStore } from "@entities/auth";

const PublicRoute = () => {
  useHealthCheckQuery();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (isAuthenticated)
    return (
      <Navigate
        to="/"
        replace
      />
    );

  return <Outlet />;
};

export default PublicRoute;
