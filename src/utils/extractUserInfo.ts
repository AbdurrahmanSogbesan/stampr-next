import { User } from "firebase/auth";

const extractUserInfo = (user: User) => {
  const { uid, displayName, email, photoURL } = user || {};
  return { uid, displayName, email, photoURL };
};

export default extractUserInfo;
