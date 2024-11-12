import StreamsSkeleton from "@components/streams/StreamsSkeleton";
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

const AuthTabs = lazy(() => import("@pages/auth/Page"));
const ProtectedRoute = lazy(() => import("@components/ProtectedRoute"));
const ResetPassword = lazy(() => import("@pages/auth/reset-password/ResetPassword"));
const ForgetPassword = lazy(() => import("@pages/auth/forget-password/ForgetPassword"));
const Home = lazy(() => import("@pages/home/Home"));
const Streams = lazy(() => import("@components/streams/Streams"));
const Chat = lazy(() => import("@pages/home/chat/Chat"));
const People = lazy(() => import("@pages/home/people/People"));
const Followings = lazy(import("@pages/home/followings/Followings"));
const Followers = lazy(() => import("@pages/home/followers/Followers"));
const Photos = lazy(() => import("@pages/home/photos/Photos"));
const Notifications = lazy(() => import("@pages/home/notifications/Notifications"));
const Profile = lazy(() => import("@pages/home/profile/Profile"));
const Error = lazy(() => import("@pages/error/Error"));

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
      path: "/app",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "home",
          element: (
            <Suspense fallback={<StreamsSkeleton />}>
              <Streams />
            </Suspense>
          ),
        },

        {
          path: "chat/messages",
          element: <Chat />,
        },

        {
          path: "people",
          element: <People />,
        },

        {
          path: "following",
          element: <Followings />,
        },

        { path: "followers", element: <Followers /> },

        { path: "photos", element: <Photos /> },

        { path: "notifications", element: <Notifications /> },

        { path: "profile", element: <Profile /> },
      ],
    },

    {
      path: "*",
      element: <Error />,
    },
  ]);

  return elements;
}

export default AppRouter;
