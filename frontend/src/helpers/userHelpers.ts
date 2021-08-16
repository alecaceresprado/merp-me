import axios from "axios"
import { unsetUserDetails } from "../store/userReducer";

export const login = (token: string): void => {
  const authToken = `Bearer ${token}`;
  axios.defaults.headers.common['authorization'] = authToken;
  localStorage.setItem('AuthToken', authToken);
}

export const logout = (dispatch: Function): void => {
    dispatch(unsetUserDetails());
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('AuthToken');
}