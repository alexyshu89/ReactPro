import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { FormsPage } from "pages/forms";
import { TaskPage } from "pages/tasks";

import { App } from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/forms" replace /> },
      { path: "forms", element: <FormsPage /> },
      { path: "tasks", element: <TaskPage /> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
