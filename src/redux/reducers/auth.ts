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

export const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "{}"),
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: { ...state.user, ...action.payload } };
    case "RESET_USER":
      return { user: {} };
    default:
      return state;
  }
};

export default authReducer;
