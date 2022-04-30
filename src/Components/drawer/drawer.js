import Icon1 from "../../Assets/Components/Drawer/icons/icon1.png";
import Icon2 from "../../Assets/Components/Drawer/icons/icon2.png";
import Icon3 from "../../Assets/Components/Drawer/icons/icon3.png";
import Icon6 from "../../Assets/Components/Drawer/icons/icon6.png";
import getWindowDimensions from "../WindowsSize/windowDimensions";
import profilePicture from "../../Assets/Components/Header/defaultProfilePicture.png";
import { Link } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { getUser } from "../../redux/user";
import "./style.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_CHANGED } from "../../redux/user";
import { useNavigate } from "react-router-dom";

import { getConfiguration, CONFIGURATION_CHANGED } from "../../redux/user";

const Drawer = (props) => {
  const { numberSetter, dashboardEnabler, bodyEnabler } = props;

  const { width } = getWindowDimensions();
  const user = useSelector(getUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const configuration = useSelector(getConfiguration);
  const [checked, setChecked] = useState(configuration.enablelogo);

  const changePage = (number) => {
    numberSetter(number);
  };

  useEffect(() => {}, [checked]);

  const handleLogOut = () => {
    dispatch({
      type: USER_CHANGED,
      payload: {
        id: "",
        username: "",
        email: "",
        password: "",
        lineupImage1: "",
        lineupImage2: "",
        lineupImage3: "",
      },
    });
    dispatch({
      type: CONFIGURATION_CHANGED,
      payload: {
        primaryColor: "#00bcd4",
        secondaryColor: "#00bcd4",
        headerColor: "#ffffff",
        numberColor: "#850037",
        cellboxColor: "#850037",
        cellboxTextColor: "#850037",
        enableLogo: false,
        imageName: "",
        textAlignment: "center",
        fontSize: "32px",
        enableEmptySheet: false,
        leftLogoSize: "50px",
        leftLogoPosition: "center",
        rightLogoSize: "50px",
        rightLogoPosition: "center",
      },
    });
    navigate("/");
  };

  return (
    <div className="drawer">
      <div className="drawer-list">
        {width > 768 ? (
          <div className="list empty-box"></div>
        ) : (
          <div className="empty-box">
            <div className="profile-image">
              <img
                src={props.image ? props.image : profilePicture}
                alt="profile"
              ></img>
            </div>
            <div className="profile-name">
            {user.username ? user.username : "Default Name"}
            </div>
          </div>
        )}

        <Link style={{ textDecoration: "none" }} to="/dashboard/roster">
          <div
            className="list"
            onClick={() => {
              changePage(1);
              dashboardEnabler(false);
              bodyEnabler(true);
            }}
          >
            <img src={Icon1} alt="roster"></img>Roster
          </div>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/dashboard/dugout">
          <div
            className="list"
            onClick={() => {
              changePage(2);
              dashboardEnabler(false);
              bodyEnabler(true);
            }}
          >
            <img src={Icon2} alt="lineup"></img>Dugout Lineup
          </div>
        </Link>

        <Link style={{ textDecoration: "none" }} to="/dashboard/umpire">
          <div
            className="list"
            onClick={() => {
              numberSetter(3);
              dashboardEnabler(false);
              bodyEnabler(true);
            }}
          >
            <img alt="UL icon" src={Icon3}></img>Umpires Lineup
          </div>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/dashboard/bpschedule">
          <div
            className="list"
            onClick={() => {
              numberSetter(6);
              dashboardEnabler(false);
              bodyEnabler(true);
            }}
          >
            <img alt="BPS icon" src={Icon6}></img>BP Schedule
          </div>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          onClick={() => {
            dashboardEnabler(false);
            bodyEnabler(true);
          }}
          to="/dashboard/settings"
        >
          <div className="list">
            <FiSettings style={{ color: "#850037", fontSize: "28px" }} />
            Configure Project
          </div>
        </Link>
        <div className="list" onClick={handleLogOut}>
          <AiOutlineLogout style={{ color: "#850037", fontSize: "28px" }} />
          Log Out
        </div>
      </div>
    </div>
  );
};

export default Drawer;
