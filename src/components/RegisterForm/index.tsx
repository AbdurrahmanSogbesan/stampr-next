import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input } from "..";
import extractUserInfo from "src/utils/extractUserInfo";
import { register } from "src/services/auth";
import { login } from "@redux/slices/user";
import { User } from "firebase/auth";

export const RegisterForm: React.FC = () => {
  const initialCredentials = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const [credentials, setCredentials] = useState({ ...initialCredentials });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    if (!credentials.email || !credentials.password) {
      throw new Error("Fill in email and password");
    }

    register(credentials)
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
        label="First Name"
        name="first_name"
        placeholder=""
        type="text"
        onChange={changeValue}
        value={credentials.first_name}
      ></Input>
      <Input
        label="Last Name"
        name="last_name"
        type="text"
        onChange={changeValue}
        value={credentials.last_name}
      ></Input>
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="john@gmail.com"
        onChange={changeValue}
        value={credentials.email}
      ></Input>
      <Input
        label="Password"
        name="password"
        type="password"
        onChange={changeValue}
        value={credentials.password}
      ></Input>
      {error && <p className="text-center mt-4 fw-bold text-danger">{error}</p>}
      <Button
        type="submit"
        rounded
        block
        label="Register"
        loading={isLoading}
        disabled={isLoading}
      ></Button>
    </form>
  );
};
