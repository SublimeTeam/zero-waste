import { createBrowserRouter } from "react-router-dom";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/sign-up";

import personalRoutes from "./pages/personal/routes";

export const routes = createBrowserRouter([
  personalRoutes,
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
]);
