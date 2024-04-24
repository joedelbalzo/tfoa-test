import axios from "axios";
import { Dispatch } from "redux";

interface User {
  id: string;
  name: string;
  email: string;
  adminStatus?: boolean;
  token?: string;
}

interface AuthState {
  currentUser?: User;
}

enum AuthActionTypes {
  SET_AUTH = "SET_AUTH",
  UPDATE_USERS_AND_PROFILES = "UPDATE_USERS_AND_PROFILES",
}

interface SetAuthAction {
  type: AuthActionTypes.SET_AUTH;
  auth: User | {};
}

interface UpdateUsersAndProfilesAction {
  type: AuthActionTypes.UPDATE_USERS_AND_PROFILES;
  currentUser?: User | null;
}

export type AuthAction = SetAuthAction | UpdateUsersAndProfilesAction;

export const authReducer = (state: AuthState = {}, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH:
      return { currentUser: action.auth as User };
    default:
      return state;
  }
};

export const loginWithGoogle = (token: string) => async (dispatch: Dispatch<AuthAction>) => {
  if (token) {
    window.localStorage.setItem("token", token);
    try {
      const response = await axios.get<User>("/api/auth/me", {
        headers: { authorization: token },
      });
      dispatch({ type: AuthActionTypes.SET_AUTH, auth: response.data });
      dispatch({ type: AuthActionTypes.UPDATE_USERS_AND_PROFILES, currentUser: response.data });
    } catch (error) {
      console.error("Error handling Google OAuth response:", error);
    }
  }
};

export const logout = () => async (dispatch: Dispatch<AuthAction>) => {
  window.localStorage.removeItem("token");
  dispatch({ type: AuthActionTypes.SET_AUTH, auth: {} });
};

export const loginWithToken = () => async (dispatch: Dispatch<AuthAction>) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    try {
      const response = await axios.get<User>("/api/auth", {
        headers: { authorization: token },
      });
      dispatch({ type: AuthActionTypes.SET_AUTH, auth: response.data });
      dispatch({ type: AuthActionTypes.UPDATE_USERS_AND_PROFILES, currentUser: response.data });
    } catch (error) {
      console.error("Login Invalid:", error);
    }
  }
};

// export const register = (credentials: { email: string; password: string }) => async (dispatch: Dispatch<AuthAction>) => {
//   try {
//     const response = await axios.post<User>("/api/auth/register", credentials);
//     window.localStorage.setItem("token", response.data.token);
//     dispatch(loginWithToken());
//   } catch (error) {
//     console.error("Registration failed:", error);
//   }
// };

export default authReducer;
