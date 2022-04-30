import Img1 from "../../../Assets/login-page/img1.png";
import { Link } from "react-router-dom";
import "./style.scss";
import { useState } from "react";
import Input from "@material-ui/core/Input";
import forgetPasswordEmailSchema from "../../../Validation/forgetPasswordEmail.validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { useSnackbar } from "notistack";

const ForgotPassword = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [email, setEmail] = useState();
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoader(true);
    try {
      const obj = { email };
      const validatedObject = await forgetPasswordEmailSchema.validate(obj);
      console.log(validatedObject, "<====== validated obj");
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}auth/forget-Password`,
        validatedObject
      );
      console.log(response);
      switch (response.status) {
        case 200:
           enqueueSnackbar(`Your password has been changed successfully`, {
      variant: "success",
    });
          navigate("/otp");
          break;
        case 202:
          enqueueSnackbar("Enter OTP provided at your email",{
          variant: "success",
          });
          navigate("/otp");
          break;
        default:
          enqueueSnackbar("Something went wrong",{
            variant: "error",
            });
          break;
      }
    } catch (e) {
      console.log(e);
      setLoader(false);
      enqueueSnackbar("Enter your Email Address",{
        variant: "error",
        });
        
    }
    setLoader(false);
  };
  return (
    <div className="login-page">
      <div className="img-div">
        <img src={Img1} alt="" />
      </div>
      <div className="content-div">
        <div className="content">
          <h1>Forgot Password</h1>
          <p>
            Need a custom lineup card progress?{" "}
            <span>Sign-up/Sign-in now.</span>
            <br />
            We are ready to serve you.
          </p>
          <div className="form-div" style={{gap : "20px"}}>
            {/* <div>
              {errorMessage()}
              {successMessage()}
            </div> */}
            <h2>Email Address</h2>
            <Input
              style={{ border: "none", width: "100%", padding: "5px 11px 7px" }}
              onChange={(e) => setEmail(e.target.value)}
              disableUnderline={true}
              className="text-field"
              type="text"
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
                RESET PASSWORD
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
    </div>
  );
};

export default ForgotPassword;
