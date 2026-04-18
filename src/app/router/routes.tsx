import { Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import { GlobalLayout } from "@app/layouts";
import { ChatPage } from "@pages/chat";
import { GraphPage } from "@pages/graph";
import { LoginPage } from "@pages/login";
import { NotePage } from "@pages/note";
import { NotFoundPage } from "@pages/notfound";
import { TodoPage } from "@pages/todo";

import { ProtectedRoute, PublicRoute } from "@app/providers";

export const routes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <GlobalLayout />,
        children: [
          {
            index: true,
            element: (
              <Navigate
                to="/note"
                replace
              />
            ),
          },
          { path: "note", element: <NotePage /> },
          { path: "graph", element: <GraphPage /> },
          { path: "todo", element: <TodoPage /> },
          { path: "chat", element: <ChatPage /> },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
  { path: "*", element: <NotFoundPage /> },
];
