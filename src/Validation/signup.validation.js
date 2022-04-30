import * as yup from "yup";

let signupSchema = yup.object().shape({
  username: yup.string().required("UserName is required"),

  email: yup
    .string()
    .email("Invalid email address format")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
    ),
});

export default signupSchema;
