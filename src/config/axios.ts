import { Axios } from 'axios';

export const api = new Axios({
  baseURL: 'http://localhost:3001',
});

export const login = async (email: string, password: string) => {
  try {
    const userLogin = await api.post('/auth', {
      email,
      password,
    },{
      validateStatus: (status) => {
        return status < 300;
      },
    });
    return userLogin.data;
  } catch (err) {
    return null;
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    const user = await api.get(`/users/${email}`);
    return user;
  } catch (err) {
    return null;
  }
};
