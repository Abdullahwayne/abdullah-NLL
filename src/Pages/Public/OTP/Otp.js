import Img1 from "../../../Assets/login-page/img1.png";
import "./style.scss";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Input from "@material-ui/core/Input";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import { Box } from "@material-ui/core";
import { useSnackbar } from "notistack";

const Otp = () => {
  const [id, setId] = useState("");
  const [code, setCode] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [message, setMessage] = useState("default message");
  const navigate = useNavigate();
  const handleChange = (code) => setCode(code);
  const closeSnackbar = () => {
    setSnackbar(false);
  };
  const handleSubmit = async () => {
    setLoader(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}auth/change-password`,
        { code }
      );
      console.log(response.data.user.id, "<===== response.data.user.id");
      switch (response.status) {
        case 202:
          enqueueSnackbar(
            "Your OTP has been expired , kindly request to resend OTP",
            {
              variant: "error"
            }

          );
          console.log("otp expired");
          break;
        case 200:
          setId(response.data.user.id);
          enqueueSnackbar("Your password has been changed successfully",{variant:"success"});
          navigate("/reset-password", { state: { id: id, setID: setId } });
          break;
        default:
          break;
      }
    } catch (e) {
      switch (e.response.status) {
        case 400:
          enqueueSnackbar("Invalid OTP",{
            variant: "error",
            });
          console.log("invalid otp");
          break;
        case 500:
          enqueueSnackbar(("Internal server error",{variant:"error"}));
          console.log("server error");
          break;
        default:
          break;
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
          <h1>One Time Password (OTP)</h1>
          <p>
            Need a custom lineup card progress?{" "}
            <span>Sign-up/Sign-in now.</span>
            <br />
            We are ready to serve you.
          </p>
          <div className="form-div">
            <h2>Enter your 6 digit OTP</h2>
            <Input
              value={code}
              style={{ width: "100%" }}
              disableUnderline={true}
              className="text-field"
              name="otp"
              onChange={(e) => handleChange(e.target.value)}
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
                onClick={() => {
                  handleSubmit();
                }}
                type="submit"
              >
                CONFIRM
              </button>
            )}
          </div>
          <p>
            Dont have an account?
            <Link style={{ textDecoration: "none" }} to={"/signup"}>
              {" "}
              <span>Sign Up</span>
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

export default Otp;
