import { api } from '@/services/axios';

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
