import { apiClient } from "./base";
import profileStore from "../store/profile-store";

export const createDiscussion = async (discussionData) => {

  try {
    const { user } = profileStore.getState();
    const response = await apiClient.post(`discussions/${user?.id}`, discussionData);
    return response.data;
  } catch (error) {
    console.error("Error creating discussion:", error);
    throw new Error(error);
  }
};


export const markReportAsAttended = async ({ id, attended }) => {
  try {
    const response = await apiClient.put(`/reports/markAsAttended/${id}`, { attended });
    return response.data;
  } catch (error) {
    console.error("Error marking report as attended:", error);
    throw new Error(error);
  }
};

export const getAllDiscussions = async () => {
  try {
    const response = await apiClient.get("discussions");
    return response.data;
  } catch (error) {
    console.error("Error fetching discussions:", error);
    throw new Error(error);
  }
};

export const getAllDiscussionsByTopic = async (topic) => {
  try {
    const response = await apiClient.get(`/discussions/${topic ? "topic/" + topic : ""}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching discussions by topic:", error);
    throw error;
  }
};

export const getDiscussionById = async (id) => {
  try {
    const response = await apiClient.get(`discussions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching discussion by ID:", error);
    throw new Error(error);
  }
};

export const updateDiscussion = async (id, discussionData) => {
  try {
    const response = await apiClient.put(`discussions/${id}`, discussionData);
    return response.data;
  } catch (error) {
    console.error("Error updating discussion:", error);
    throw new Error(error);
  }
};

export const deleteDiscussion = async (id) => {
  try {
    const response = await apiClient.delete(`discussions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting discussion:", error);
    throw new Error(error);
  }
};
