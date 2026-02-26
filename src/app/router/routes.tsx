import type { RouteObject } from "react-router-dom";

import { GlobalLayout } from "@app/components";
import { HomePage, LoginPage, NotFoundPage } from "@app/pages";

import { ProtectedRoute, PublicRoute } from "./provider";

export const routes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <GlobalLayout />,
        children: [{ index: true, element: <HomePage /> }],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
  { path: "*", element: <NotFoundPage /> },
];
