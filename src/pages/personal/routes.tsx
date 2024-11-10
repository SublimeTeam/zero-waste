import { RouteObject } from "react-router-dom";
import { Home } from "./home";
import { Store } from "./store";
import { PlaceOrder } from "./store/place-order";
import { Orders } from "./orders";
import { Discover } from "./discover";
import { AuthGuard } from "./AuthGuard";

export default {
  path: "/",
  element: <AuthGuard />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/orders",
      element: <Orders />,
    },
    {
      path: "/discover",
      element: <Discover />,
    },
    {
      path: "/:id",
      children: [
        {
          path: "/:id",
          element: <Store />,
        },
        {
          path: "/:id/:packageId",
          element: <PlaceOrder />,
        },
      ],
    },
  ],
} satisfies RouteObject;
