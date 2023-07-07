import { useSelector } from "react-redux";

const useAuth = () => {
  const user = useSelector((state: any) => state.user.user);
  return { user };
};

export default useAuth;
