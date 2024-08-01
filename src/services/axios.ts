import { ObjectSendDto } from '@/dtos/object.dto';
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

export const registerUser = async (data: FormData) => {
  try {
    const response = await api.post('user', data, {
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
    const response = await api.get('category');
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

export const findAllCategoriesWithObjects = async () => {
  try {
    const response = await api.get('category/find-all-with-objects');
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

export const registerSubcategory = async (
  subcategory: string,
  category: string,
) => {
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
    const response = await api.get(`subcategory/${idCategory}`);
    const responseData = await response.data;
    responseData['error'] = false;
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

export const registerTag = async (name: string) => {
  try {
    const response = await api.post('tag', { name });
    const responseData = await response.data;
    responseData['error'] = false;
    return responseData;
  } catch (err: any) {
    if (err.response.data) {
      return {
        error: true,
        message: err.response.data.message[0],
      };
    }
  }
};

export const findAllTags = async () => {
  try {
    const response = await api.get('tag');
    const responseData = await response.data;
    responseData['error'] = false;
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

export const registerObject = async (object: FormData) => {
  try {
    const response = await api.post('object', object, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const responseData = await response.data;
    responseData['error'] = false;
    return responseData;
  } catch (err: any) {
    if (err.response.data) {
      return {
        error: true,
        message: err.response.data.message[0],
      };
    }
  }
};

export const findObjectById = async (idObject: string) => {
  try {
    const response = await api.get(`object/${idObject}`);
    const responseData = await response.data;
    responseData['error'] = false;
    return responseData;
  } catch (err: any) {
    if (err.response.data) {
      return {
        error: true,
        message: err.response.data.message[0],
      };
    }
  }
};

export const findAllComments = async () => {
  try {
    const response = await api.get('comments');
    const responseData = await response.data;
    responseData['error'] = false;
    return responseData;
  } catch (err: any) {
    if (err.response.data) {
      return {
        error: true,
        message: err.response.data.message[0],
      };
    }
  }
};

export const registerComment = async (comment: string, idUser: string) => {
  try {
    const response = await api.post('comments', { comment, idUser });
    const responseData = await response.data;
    responseData['error'] = false;
    return responseData;
  } catch (err: any) {
    if (err.response.data) {
      return {
        error: true,
        message: err.response.data.message[0],
      };
    }
  }
};
