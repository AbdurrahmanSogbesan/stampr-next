import { RegisterForm, LoginForm, Button, RouterLink } from "@components";
import { useDispatch } from "react-redux";
import { useState } from "react";
import extractUserInfo from "src/utils/extractUserInfo";
import { User, getAuth, signInWithPopup } from "firebase/auth";
import logoSrc from "src/assets/images/logo.svg";
import styles from "./login.module.scss";
import { login } from "@redux/slices/user";
import { provider } from "src/config/firebase";
import { toast } from "react-hot-toast";
import Head from "next/head";

const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const googleLogin = () => {
    setIsLoading(true);
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        dispatch(login(extractUserInfo(user as User)));
        setIsLoading(false);
        toast.success("Login Successful");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
        console.log(error.message);
      });
  };

  const form = (
    <>
      <RouterLink to="/">
        <img className="mb-5" height="40" src={logoSrc.src as any} alt="" />
      </RouterLink>
      <h1 className="my-auto fw-bold">{showLogin ? "Login" : "Register"}</h1>
      <p className="mb-4 mt-2">{showLogin ? "" : "Let's get you started!"}</p>
      <Button
        rounded
        variant="outline-secondary"
        block
        label={showLogin ? "Sign in with Google" : "Sign up with Google"}
        handleClick={googleLogin}
        loading={isLoading}
        disabled={isLoading}
      ></Button>
      <div className="horizontal-text my-5">
        <span className="text-muted small">
          or sign {showLogin ? "in" : "up"} with email
        </span>
      </div>
      {showLogin ? <LoginForm /> : <RegisterForm />}
    </>
  );

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Spartan:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={`px-3 px-md-0`}>
        <div className={`row align-items-center ${styles.Main}`}>
          <div className="col-12 col-md-6 px-md-7 px-xl-10 ">
            {form}
            <div className="small d-flex align-items-center mt-3">
              {showLogin ? `Not registered yet?` : `Already have an account?`}
              <span
                className={`px-1 text-primary ${styles["link-pointer"]}`}
                onClick={() => {
                  setShowLogin(!showLogin);
                }}
              >
                {showLogin ? `Create an account` : `Login now`}
              </span>
            </div>
          </div>
          <div
            className={`d-none d-md-block col-12 col-md-6 h-100 ${styles["Auth-bg"]}`}
          ></div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
