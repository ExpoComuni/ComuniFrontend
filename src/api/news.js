import { apiClient } from "./base";

export const createNews = async (newsData) => {
  try {
    const response = await apiClient.post("news", newsData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const getAllNews = async () => {
  try {
    const response = await apiClient.get("news");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const getNewsById = async (id) => {
  try {
    const response = await apiClient.get(`news/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const updateNews = async (id, newsData) => {
  try {
    const response = await apiClient.put(`news/${id}`, newsData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const deleteNews = async (id) => {
  try {
    const response = await apiClient.delete(`news/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
