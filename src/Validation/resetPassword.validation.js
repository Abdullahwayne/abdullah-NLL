import * as Yup from "yup";

let resetPasswordSchema = Yup.object().shape({
  email: Yup.string()
  .required("Email is required"),
 
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  id: Yup.string().required(),
});

export default resetPasswordSchema;
