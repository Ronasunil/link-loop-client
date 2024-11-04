import { useRoutes } from "react-router-dom";
import AuthTabs from "@pages/auth/Page";
import ResetPassword from "@pages/auth/reset-password/ResetPassword";
import ForgetPassword from "@pages/auth/forget-password/ForgetPassword";

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
  ]);

  return elements;
}

export default AppRouter;
