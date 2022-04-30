import * as yup from "yup";

let forgetPasswordEmailSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});

export default forgetPasswordEmailSchema;
