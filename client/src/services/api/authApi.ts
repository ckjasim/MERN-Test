import { baseURL } from "../interceptors/api"; 


export const userSignupApi = async (data:any) => {
  try {

    const response = await baseURL.post('/api/v1/inventory',data);
    const tasks = response.data;
    return tasks;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};