import { User } from "firebase/auth";

interface AuthState {
  user: User | {};
}

interface SetUserAction {
  type: "SET_USER";
  payload: User;
}

interface ResetUserAction {
  type: "RESET_USER";
}

type AuthAction = SetUserAction | ResetUserAction;

export const initialState = {
  ...(JSON.parse(localStorage.getItem("user") as string) || {}),
};

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };
    case "RESET_USER":
      return {};
    default:
      return state;
  }
};

export default authReducer;
