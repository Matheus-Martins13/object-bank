import Axios from 'axios';

export const api = Axios.create({
  baseURL: 'http://localhost:3001',
});

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth', { email, password });
    const payload = await response.data;
    payload['error'] = false;
    return payload;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data.message[0],
    };
  }
};

export const register = async (data: FormData) => {
  try {
    const response = await api.post('users', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const responseData = await response.data;
    responseData['error'] = false;
    return responseData;
  } catch (err: any) {
    console.log(err);
    return {
      error: true,
      message: err.response.data.message[0],
    };
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
