import Header from "@components/header/Header";
import "./home.scss";
import Sidebar from "@components/sidebar/Sidebar";

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function Home() {
  const { isLoggedIn } = useSelector((state) => state.user);
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
