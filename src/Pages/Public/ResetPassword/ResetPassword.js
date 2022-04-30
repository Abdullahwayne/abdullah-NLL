import Img1 from "../../../Assets/login-page/img1.png";
import "./style.scss";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import { CircularProgress } from "@material-ui/core";
import { Snackbar, Box } from "@material-ui/core";
import resetPasswordSchema from "../../../Validation/resetPassword.validation";
import { useSnackbar } from "notistack";

const ResetPassword = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [passwordVisibilty, setPasswordVisiblity] = useState(true);
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [secondPassword, setSecondPassword] = useState("");
  const [snackbar, setSnackbar] = useState(false);
  const [message, setMessage] = useState("default message");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    setLoader(true);
    if (password !== secondPassword) {
      setMessage("Password does not match");
      enqueueSnackbar("Password does not match !!", { variant: "error" });
      setLoader(false);
      return;
    }
    try {
      const myObj = {
        password: password,
        id: state.id,
        secondPassword: secondPassword,
      };
      let validatedObj = await resetPasswordSchema.validate(myObj);
      console.log(validatedObj, "<====== validatedObj");
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}auth/reset-password`,
        validatedObj
      );
      switch (response.status) {
        case 200:
          enqueueSnackbar("Password sucessfully changed", {
            variant: "success",
          });
          navigate("/");
          break;
        default:
          break;
      }
    } catch (e) {
      console.table(e, "<===");
      try {
        enqueueSnackbar(e.message, {
          variant: "warning",
        });
      } catch {
        enqueueSnackbar(e.message, {
          variant: "warning",
        });
      }
    }
    setLoader(false);
    setSnackbar(true);
  };

  return (
    <div className="login-page">
      <div className="img-div">
        <img src={Img1} alt="" />
      </div>
      <div className="content-div">
        <div className="content">
          <h1>Reset Password</h1>
          <p>
            Need a custom lineup card progress?{" "}
            <span>Sign-up/Sign-in now.</span>
            <br />
            We are ready to serve you.
          </p>
          <div className="form-div">
            <h2>Password</h2>
            <Input
              value={password}
              disableUnderline={true}
              className="text-field"
              onChange={(e) => setPassword(e.target.value)}
              style={{ border: "none", width: "100%" }}
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

            <h2>Confirm Password</h2>
            <Input
              value={secondPassword}
              disableUnderline={true}
              className="text-field"
              onChange={(e) => setSecondPassword(e.target.value)}
              style={{ border: "none", width: "100%" }}
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
                onClick={() => handleSubmit()}
                type="submit"
              >
                Change Password
              </button>
            )}
          </div>
          <p>
            Dont have an account?{" "}
            <Link style={{ textDecoration: "none" }} to="/signup">
              <span>Sign Up</span>{" "}
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

export default ResetPassword;
