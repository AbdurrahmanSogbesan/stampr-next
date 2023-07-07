import { login, logout } from "@redux/slices/user";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { FC, createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "src/config/firebase";

export const AuthContext = createContext(undefined);

export const AuthProvider: FC = ({ children }) => {
  const authValue = useProvideAuth();
  return (
    <AuthContext.Provider value={authValue as any}>
      {children}
    </AuthContext.Provider>
  );
};

const useProvideAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
        router.push("/");
      } else {
        dispatch(logout());
        // router.push("/login");
      }
    });
    return subscriber;
  }, []);
};
