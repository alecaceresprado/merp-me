import axios from "axios"

export const login = (token: string): void => {
  const authToken = `Bearer ${token}`;
  axios.defaults.headers.common['authorization'] = authToken;
  localStorage.setItem('AuthToken', authToken);
}