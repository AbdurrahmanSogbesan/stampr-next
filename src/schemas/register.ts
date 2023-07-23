import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  first_name: Yup.string(),
  last_name: Yup.string(),
  email: Yup.string()
    .email("Must be a valid email.")
    .required("Email is required."),
  password: Yup.string().required("Password is required"),
});

export default RegisterSchema;
