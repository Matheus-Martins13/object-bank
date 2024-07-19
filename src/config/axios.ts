import Axios from 'axios';

export const api = Axios.create({
  baseURL: 'http://localhost:3001',
});

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth', { email, password });
    const payload = await response.data;
    return payload;
  } catch (err) {
    return null;
  }
};

export const register = async (data: UserDto) => {
  try {
    const response = await api.post('users', data);
    const responseData = await response.data;
    return responseData;
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
