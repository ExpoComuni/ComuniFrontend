import { apiClient } from "./base";

export const createUSer = async (userData) => {
   const response = await apiClient.post('/users/create', userData)
   return response.data
}

