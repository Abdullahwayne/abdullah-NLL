import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../Assets/Components/Drawer/logo.png";
import profilePicture from "../../Assets/Components/Header/defaultProfilePicture.png";
import useWindowDimensions from "../WindowsSize/windowDimensions";
import "./style.scss";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/user";

const Header = (props) => {
  const { width } = useWindowDimensions();
  const { dashboardEnabler, dashboard, enableBody } = props;
  const user = useSelector(getUser);
  return (
    <>
      {width > 768 ? (
        <div className="header">
          <div className="logo">
            <img
              src={logo}
              alt="company logo"
              onClick={() => console.log(user)}
            ></img>
          </div>
          <div className="profile">
            <div className="profile-name">
              {user.username ? user.username : "Default Name"}
            </div>
            <div className="profile-image">
              <img
                src={user.profileImage ? props.image : profilePicture}
                alt="profile"
              ></img>
            </div>
          </div>
        </div>
      ) : (
        <div className="header-mobile">
          <div className="dashboard-icon-div">
            <MenuIcon
              className="dashboard-icon"
              onClick={() => {
                dashboardEnabler(dashboard ? false : true);
                enableBody(dashboard ? true : false);
              }}
            />
          </div>
          <div className="mobile-logo">
            <img src={logo} alt="company logo"></img>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
