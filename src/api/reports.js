import { apiClient } from "./base";
import profileStore from "../store/profile-store"; 

export const createReport = async (reportData) => {
    try {
        const { user } = profileStore.getState(); 

        const response = await apiClient.post(`/reports/create/${user?.id}`, reportData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

export const getAllReports = async() => {
    try {
        const response = await apiClient.get('/reports');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

export const getAllReportsByUserId = async () => {
    try {
        const { user } = profileStore.getState();
        const response = await apiClient.get(`/reports/getAll/${user?.id}`)
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}
// Mark a report as attended/unattended
export const markReportAsAttended = async ( id ) => {
    try {
      const response = await apiClient.put(`/reports/markAsAttended/${id}`,);
      return response.data;
    } catch (error) {
      console.error("Error marking report as attended:", error);
      throw new Error(error);
    }
  };

export const deleteReport = async (id) => {
    try {
        const respose = await apiClient.delete(`/delete/${id}`)
        return respose.data
    } catch (error) {
        throw new Error(error)
    }
}
