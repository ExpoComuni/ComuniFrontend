import { apiClient } from "./base";

export const createLogin = async (data) => {
    const response = await apiClient.post('/auth/', data)
    return response.data
}