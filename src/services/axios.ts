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

export const registerCategory = async (name: string) => {
  try {
    const response = await api.post('category', { name });
    const responseData = await response.data;
    responseData['error'] = false;
    return responseData;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data.message[0],
    };
  }
};

export const findAllCategories = async () => {
  try {
    const response = await api.get('category/find-all');
    const responseData = await response.data;
    return responseData;
  } catch (err: any) {
    if (err.response.data) {
      return {
        error: true,
        message: err.response.data.message[0],
      };
    } else return err;
  }
};

export const registerSubcategory = async (subcategory: string, category: string) => {
  try {
    const response = await api.post('subcategory', { subcategory, category });
    const responseData = await response.data;
    responseData['error'] = false;
    return responseData;
  } catch (err: any) {
      return {
        error: true,
        message: err.response.data.message[0],
      };
  }
};


export const findAllSubcategoriesInCategory = async (idCategory: string) => {
  try {
    const response = await api.get(`subcategory/find-all/${idCategory}`);
    const responseData = await response.data;
    return responseData;
  } catch (err: any) {
    if (err.response.data) {
      return {
        error: true,
        message: err.response.data.message[0],
      };
    } else return err;
  }
};


export const findAllTags = async () => {
  try {
    const response = await api.get('tag');
    const responseData = await response.data;
    return responseData;
  } catch (err: any) {
    if (err.response.data) {
      return {
        error: true,
        message: err.response.data.message[0],
      };
    } else return err;
  }
};
