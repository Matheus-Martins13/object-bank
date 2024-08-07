import { CollectionDto } from '@/dtos/collection.dto';

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

export const registerCollection = async (name: string) => {
  try {
    const response = await api.post('collection', { name });
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

export const findAllCollections = async () => {
  try {
    const response = await api.get('collection');
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

export const findAllCollectionsWithObjects = async () => {
  try {
    const response = await api.get('collection/find-all-complete');
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

export const findCollectionByIdComplete = async (idCollection: string) => {
  try {
    const response = await api.get(
      `collection/find-complete-by-id/${idCollection}`,
    );
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

export const updateCollection = async (idCollection: string, name: string) => {
  try {
    const response = await api.patch(`collection/${idCollection}`, { name });
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

export const removeCollection = async (idCollection: string) => {
  try {
    const response = await api.delete(`collection/${idCollection}`);
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
    if (!responseData) return null;
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

export const updateObject = async (
  idObject: string,
  data: {
    name: string;
    description: string;
    collection: CollectionDto;
    tags: string;
  },
) => {
  try {
    const response = await api.patch(`object/${idObject}`, data);
    const responseData = await response.data;
    responseData['error'] = false;
    return responseData;
  } catch (err: any) {
    if (err.response['data']) {
      return {
        error: true,
        message: err.response.data.message[0],
      };
    }
  }
};

export const removeObject = async (idObject: string) => {
  try {
    const response = await api.delete(`object/${idObject}`);
    const responseData = await response.data;
    responseData['error'] = false;
    return responseData;
  } catch (err: any) {
    if (err.response['data']) {
      return {
        error: true,
        message: err.response.data.message[0],
      };
    }
  }
};

export const findAllComments = async (idObject: string) => {
  try {
    const response = await api.get(`comment/${idObject}`);
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

export const registerComment = async (comment: any) => {
  try {
    const response = await api.post('comment', comment);
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

export const findFavorite = async (idObject: string, idUser: string) => {
  try {
    const response = await api.post('favorite/find-favorite', {
      idObject,
      idUser,
    });
    const responseData = await response.data;
    if (!responseData) return null;
    responseData['error'] = false;
    return responseData;
  } catch (err: any) {
    if (err.response['data']) {
      return {
        error: true,
        message: err.response.data.message[0],
      };
    }
  }
};

export const registerFavorite = async (idObject: string, idUser: string) => {
  try {
    const response = await api.post(`favorite`, { idObject, idUser });
    const responseData = await response.data;
    responseData['error'] = false;
    return responseData;
  } catch (err: any) {
    if (err.response['data']) {
      return {
        error: true,
        message: err.response.data.message[0],
      };
    }
  }
};

export const removeFavorite = async (idFavorite: string) => {
  try {
    const response = await api.delete(`favorite/${idFavorite}`);
    const responseData = await response.data;
    responseData['error'] = false;
    return responseData;
  } catch (err: any) {
    if (err.response['data']) {
      return {
        error: true,
        message: err.response.data.message[0],
      };
    }
  }
};
