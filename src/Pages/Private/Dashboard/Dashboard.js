import { useEffect } from "react";
import Drawer from "../../../Components/drawer/drawer";
import Header from "../../../Components/Header/header";
import { useState } from "react";
import useWindowDimensions from "../../../Components/WindowsSize/windowDimensions";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../../../redux/user";
import { useSelector } from "react-redux";
import "./style.scss";

const Dashboard = () => {
  const [number, setNumber] = useState(1);
  const [dashboard, setDashboard] = useState(true);
  const [showBody, setShowBody] = useState(true);
  const { width, height } = useWindowDimensions();
  const user = useSelector(getUser);
  useEffect(() => {}, [number, dashboard, showBody, width, height]);
  console.log("user in dashboard", user);
  if (user.email === "") {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <div className="dashboard">
        <Header
          dashboard={dashboard}
          dashboardEnabler={setDashboard}
          enableBody={setShowBody}
        />
        <div className="dashboard-breaker">
          {width > 768 ? (
            <div className="dashboard-breaker-main-drawer">
              {dashboard && (
                <Drawer
                  numberSetter={setNumber}
                  // dashboardEnabler={setDashboard}
                  // numberSetter={setNumber}
                />
              )}
            </div>
          ) : dashboard ? (
            <Drawer
              bodyEnabler={setShowBody}
              dashboardEnabler={setDashboard}
              numberSetter={setNumber}
            />
          ) : null}
          {showBody ? (
            <div className="dashboard-breaker-body-dashboard">
              <Outlet />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
