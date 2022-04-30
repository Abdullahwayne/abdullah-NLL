import Img1 from "../../../Assets/login-page/img1.png";
import "./style.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useSnackbar } from "notistack";
import axios from "axios";
import signupSchema from "../../../Validation/signup.validation";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@material-ui/core";

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [passwordVisibilty, setPasswordVisiblity] = useState(true);
  const [email, setEmail] = useState("");
  const {enqueueSnackbar} = useSnackbar();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const openSnackbar = () => {
    setSnackbar(true);
  };
  const closeSnackbar = () => {
    setSnackbar(false);
  };
  const signUp = async () => {
    try {
      setLoader(true);
      const validationObj = {
        username: username,
        email: email,
        password: password,
      };
      const validation = await signupSchema.validate(validationObj);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}user`,
        validation
      );
      console.log(response.status, "<=== =status");
      if (response.status === 201) {
        
       
        enqueueSnackbar(`User created successfully`, {
          variant: "success",
        });
        navigate("/");
      }
      if (response.status === 400) {
       
        enqueueSnackbar(`User created successfully`, {
          variant: "success",
        });
        console(response.data.message, "<=== =message");
       
      }
      if (response.status === 500) {
       
        enqueueSnackbar(`Internal Server error`, {
          variant: "error",
        });
      }
      //(response.data);
    } catch (error) {
     
      enqueueSnackbar(error.message, {
        variant: "error",
      });
      setLoader(false);
    }
    setLoader(false);
  };

  const handleName = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className="login-page">
      <div className="img-div">
        <img src={Img1} alt="" />
      </div>
      <div className="content-div">
        <div className="content">
          {/* <div className="messages">
            {errorMessage()}
            {successMessage()}
          </div> */}
          <h1>Sign Up</h1>
          <p>
            Need a custom lineup card programs?{" "}
            <span>Sign-up/Sign-in now.</span>
            <br />
            We are ready to serve you.
          </p>
          <div className="form-div">
            <h2>Full Name</h2>
            <Input
              style={{ border: "none", width: "100%", padding: "5px 11px 7px" }}
              disableUnderline={true}
              value={username}
              onChange={handleName}
              className="text-field"
              type="text"
            ></Input>
            <h2>Email Address</h2>
            <Input
              style={{ border: "none", width: "100%", padding: "5px 11px 7px" }}
              disableUnderline={true}
              value={email}
              onChange={handleEmail}
              className="text-field"
              type="text"
            ></Input>
            <h2>Password</h2>
            <Input
              disableUnderline={true}
              className="text-field"
              value={password}
              onChange={handlePassword}
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
              <Link to="/forgot-password">
                <p>Forget Password?</p>
              </Link>
            </div>
            {loader ? (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CircularProgress style={{ color: "#850037" }} />
              </Box>
            ) : (
              <button
                className="signIn-button"
                onClick={() => {
                  signUp();
                }}
                type="submit"
              >
                SIGN UP{" "}
              </button>
            )}
          </div>
          <p>
            Already have an account
            <Link style={{ textDecoration: "none" }} to="/">
              <span>{"\t"} Sign In</span>{" "}
            </Link>
          </p>
        </div>
      </div>
      <Snackbar
        open={snackbar}
        autoHideDuration={5000}
        onClose={closeSnackbar}
        message={message}
      />
    </div>
  );
};

export default Login;
