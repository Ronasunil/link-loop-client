import { useRoutes } from "react-router-dom";
import AuthTabs from "@pages/auth/Page";
import ResetPassword from "@pages/auth/reset-password/ResetPassword";
import ForgetPassword from "@pages/auth/forget-password/ForgetPassword";
import Home from "@pages/home/Home";

function AppRouter() {
  const elements = useRoutes([
    {
      path: "/",
      element: <AuthTabs />,
    },

    {
      path: "/reset-password/:token",
      element: <ResetPassword />,
    },

    {
      path: "/forget-password",
      element: <ForgetPassword />,
    },

    {
      path: "/app/home",
      element: <Home />,
    },
  ]);

  return elements;
}

export default AppRouter;
