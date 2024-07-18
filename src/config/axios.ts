import { Axios } from "axios";

export const api = new Axios({
  baseURL: "http://localhost:3001",
});

export const findUserByEmail = async (email: string) => {
  const user = await api.get(`/users/${email}`);
  return user.data;
};
