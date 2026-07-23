import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { FormsPage } from "pages/forms";
import { TaskPage } from "pages/tasks";
import { UseRefPage } from "pages/use-ref";

import { App } from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/use-ref" replace /> },
      { path: "forms", element: <FormsPage /> },
      { path: "tasks", element: <TaskPage /> },
      { path: "use-ref", element: <UseRefPage /> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
