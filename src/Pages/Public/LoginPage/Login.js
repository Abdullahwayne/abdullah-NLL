import Img1 from "../../../Assets/login-page/img1.png";
import "./style.scss";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import { userLogin } from "../../../redux/user";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/user";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
const Login = () => {
  const navigate = useNavigate();
  const [passwordVisibilty, setPasswordVisiblity] = useState(true);
  const [email, setEmail] = useState("t@t.com");
  const [password, setPassword] = useState("abc123!@#");
  const [snackbar, setSnackbar] = useState(false);
  const [message, setMessage] = useState("default message");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    try {
      setLoader(true);
      const wow = await dispatch(userLogin({ email, password }));
      console.log(wow);
      if (wow.status === 200) {
        enqueueSnackbar("User logged in successfully", { variant: "success" });
        navigate("/dashboard/roster");
      }
      if (wow.status === 400) {
        enqueueSnackbar("User does not exist");
      }
      if (wow.status === 401) {
        enqueueSnackbar("Invalid username or password", { variant: "error" });
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <div className="login-page">
      <div className="img-div">
        <img src={Img1} alt="cover" />
      </div>
      <div className="content-div">
        <div className="content">
          <h1
            onClick={() => {
              console.log(user, "wow");
            }}
          >
            Sign In
          </h1>
          <p>
            Need a custom lineup card progress?{" "}
            <span>Sign-up/Sign-in now.</span>
            <br />
            We are ready to serve you.
          </p>
          <div className="form-div">
            <h2>Email Address</h2>
            <Input
              value={email}
              style={{ border: "none", width: "100%", padding: "5px 11px 7px" }}
              onChange={(e) => setEmail(e.target.value)}
              disableUnderline={true}
              className="text-field"
              type="text"
            ></Input>
            <h2>Password</h2>
            <Input
              value={password}
              disableUnderline={true}
              className="text-field"
              onChange={(e) => setPassword(e.target.value)}
              style={{ border: "none", width: "100%", padding: "5px 11px 7px" }}
              type={passwordVisibilty ? "password" : "text"}
              endAdornment={
                <InputAdornment
                  style={{
                    backgroundColor: "#f5f5f5",
                  }}
                  position="end"
                >
                  <IconButton
                    onClick={(e) => {
                      if (passwordVisibilty === true)
                        setPasswordVisiblity(false);
                      else setPasswordVisiblity(true);
                    }}
                  >
                    {passwordVisibilty ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            <div className="forget-password">
              <Link to="/forgot-password">Forget Password</Link>
            </div>
            <div
              styles={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loader ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <CircularProgress style={{ color: "#850037" }} />
                </Box>
              ) : (
                <button
                  className="signIn-button"
                  onClick={() => {
                    handleSubmit();
                  }}
                  type="submit"
                >
                  SIGN IN
                </button>
              )}
            </div>
          </div>
          <p>
            Dont have an account?{" "}
            <Link style={{ textDecoration: "none" }} to="/signup">
              <span>Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
      <Snackbar open={snackbar} autoHideDuration={5000} message={message} />
    </div>
  );
};

export default Login;
