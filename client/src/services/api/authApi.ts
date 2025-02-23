import { baseURL } from '../interceptors/api';

export const userSignupApi = async (data: any) => {
  try {
    const response = await baseURL.post('/auth/verifyExistingUser', data);
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
export const createUserApi = async (data: any) => {
  try {
    const response = await baseURL.post('/auth', data);
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const getUserDataApi = async (data: any) => {
  try {
    const response = await baseURL.post('/auth/getUserData', { id: data });
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
