import Header from "@components/header/Header";
import "./home.scss";
import Sidebar from "@components/sidebar/Sidebar";

import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffectOnce } from "@hooks/useEffectOnce";
import { notificationService } from "@api/notification/NotificationService";
import { initNotification } from "@rtk/slice/notification/notificationSlice";

function Home() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffectOnce(async () => {
    const data = await notificationService.getNotification();
    dispatch(initNotification({ notifications: data }));
  });

  if (!isLoggedIn) return <Navigate to="/" replace={true} />;

  return (
    <>
      <Header />
      <div className="dashboard">
        <div className="dashboard-sidebar">
          <Sidebar />
        </div>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Home;
