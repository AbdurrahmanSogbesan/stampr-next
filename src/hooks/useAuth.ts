import { useSelector } from "react-redux";

// todo: recurring issue
const useAuth = () => {
  const user = useSelector((state: any) => state.user.user);
  return { user };
};

export default useAuth;
