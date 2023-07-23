import { useDispatch } from "react-redux";
import { Button, Input } from "..";
import extractUserInfo from "src/utils/extractUserInfo";
import { register } from "src/services/auth";
import { login } from "@redux/slices/user";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import RegisterSchema from "src/schemas/register";

export const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();

  const registerFormInitialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: registerFormInitialValues,
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const user = await register(values);
        if (user) {
          dispatch(login(extractUserInfo(user)));
          toast.success("Sign up successful!");
        }
        setSubmitting(false);
      } catch (error: any) {
        setSubmitting(false);
        toast.error(error.message);
      }
    },
  });

  const { isSubmitting, isValid, getFieldMeta, getFieldProps } = formik;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        label="First Name"
        placeholder=""
        type="text"
        {...getFieldProps("first_name")}
        {...getFieldMeta("first_name")}
      ></Input>
      <Input
        label="Last Name"
        type="text"
        {...getFieldProps("last_name")}
        {...getFieldMeta("last_name")}
      ></Input>
      <Input
        label="Email"
        type="email"
        placeholder="john@gmail.com"
        {...getFieldProps("email")}
        {...getFieldMeta("email")}
      ></Input>
      <Input
        label="Password"
        type="password"
        {...getFieldProps("password")}
        {...getFieldMeta("password")}
      ></Input>
      <Button
        type="submit"
        rounded
        block
        label="Register"
        loading={isSubmitting}
        disabled={isSubmitting || !isValid}
      ></Button>
    </form>
  );
};
