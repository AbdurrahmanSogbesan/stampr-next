import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, RouterLink } from "..";
import extractUserInfo from "src/utils/extractUserInfo";
import { firebaseLogin } from "src/services/auth";
import { login } from "@redux/slices/user";
import { User } from "firebase/auth";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import LoginSchema from "src/schemas/login";

export const LoginForm: React.FC = () => {
  const dispatch = useDispatch();

  const loginFormInitialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: loginFormInitialValues,
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const user = await firebaseLogin(values);
        if (user) {
          dispatch(login(extractUserInfo(user)));
          toast.success("Login Successful!");
        }
        setSubmitting(false);
      } catch (error: any) {
        setSubmitting(false);
        toast.error(error.message);
      }
    },
  });

  const { isSubmitting, isValid, getFieldProps, getFieldMeta } = formik;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        label="Email"
        placeholder="hi@gmail.com"
        type="email"
        {...getFieldProps("email")}
        {...getFieldMeta("email")}
      ></Input>
      <Input
        label="Password"
        type="password"
        placeholder="Your password"
        {...getFieldProps("password")}
        {...getFieldMeta("password")}
      ></Input>
      <RouterLink className="pt-0 fs-6 text-end mb-3 text-primary" to="/login">
        Forgot Password?
      </RouterLink>
      <Button
        type="submit"
        rounded
        block
        label="Login"
        loading={isSubmitting}
        disabled={isSubmitting || !isValid}
      ></Button>
    </form>
  );
};
