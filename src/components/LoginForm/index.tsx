import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, RouterLink } from "..";
import extractUserInfo from "src/utils/extractUserInfo";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      throw new Error("Fill in email and password");
    }

    firebaseLogin({ email, password })
      .then((user: User) => {
        dispatch(login(extractUserInfo(user)));
      })
      .catch((error: Error) => {
        setError(error.message);
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
      {error && (
        <p className="text-center mt-4 font-weight-bold text-danger">{error}</p>
      )}
      <RouterLink className="pt-0 fs-6 text-right mb-3" to="/login">
        Forgot Password?
      </RouterLink>
      <Button type="submit" rounded block label="Login"></Button>
    </form>
  );
};
