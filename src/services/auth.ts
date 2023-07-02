import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { save } from "src/config/firebase";
import { USERS } from "src/config/firebase/collections";
import { logout as logoutUser } from "@redux/slices/user";
import { toast } from "react-hot-toast";

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface VerifyEmailData {
  url?: string;
}

const auth = getAuth();

export const register = ({
  first_name,
  last_name,
  email,
  password,
}: RegisterData): Promise<any> => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const payload = {
          first_name,
          last_name,
          authProvider: "emailAndPassword",
          email,
        };
        //* Send verification email
        //* Add user to database
        save(USERS, payload)
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        toast.success("Sign up successful!");
        resolve(userCredential.user);
      })
      .catch((error: any) => {
        // return error
        toast.error(error);
        reject(error);
      });
  });
};

export const firebaseLogin = ({ email, password }: LoginData): Promise<any> => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // Signed in
        resolve(userCredentials.user);
        toast.success("Login Successful");

        // ...
      })
      .catch((error: any) => {
        reject(error);
        toast.error(error);
        // ..
      });
  });
};

export const verifyEmail = ({
  url = "http://localhost:3000?",
}: VerifyEmailData): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!auth.currentUser) throw new Error("User must be signed in");

    sendEmailVerification(auth.currentUser)
      .then(() => {
        resolve();
      })
      .catch((e: any) => {
        reject(e);
      });
  });
};

export const logout = () => {
  signOut(auth)
    .then(() => {
      logoutUser();
      toast.success("Logout Successful");
    })
    .catch((error) => {
      toast.error(error);
      console.log("error :>> ", error);
    });
};
