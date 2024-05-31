import { Outlet } from "react-router-dom";
// import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import "../assets/css/dashboard.css";

const Dashboard = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="dashboard">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="content-container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
