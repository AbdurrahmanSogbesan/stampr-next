import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, RouterLink } from "..";
import extractUserInfo from "src/utils/extractUserInfo";
import { firebaseLogin } from "src/services/auth";
import { login } from "@redux/slices/user";
import { User } from "firebase/auth";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    if (!email || !password) {
      setIsLoading(false);
      throw new Error("Fill in email and password");
    }

    firebaseLogin({ email, password })
      .then((user: User) => {
        dispatch(login(extractUserInfo(user)));
        setIsLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        name="email"
        placeholder="hi@gmail.com"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      ></Input>
      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Your password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      ></Input>
      {error && <p className="text-center mt-4 fw-bold text-danger">{error}</p>}
      <RouterLink className="pt-0 fs-6 text-end mb-3 text-primary" to="/login">
        Forgot Password?
      </RouterLink>
      <Button
        type="submit"
        rounded
        block
        label="Login"
        loading={isLoading}
        disabled={isLoading}
      ></Button>
    </form>
  );
};
