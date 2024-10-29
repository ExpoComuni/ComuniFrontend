import { apiClient } from "./base";
import profileStore from "../store/profile-store";

export const updateUserData = async (userData) => {
    try {
        const { user } = profileStore.getState();
        const response = await apiClient.put(`/users/update/${user?.id}`, userData)
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}