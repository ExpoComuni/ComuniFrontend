import { apiClient } from './base';
import profileStore from '../store/profile-store';

// Función para crear un comentario
export const createComment = async ({ content, discussionId }) => {
  const { user } = profileStore.getState(); // Obtener el estado del usuario
  const response = await apiClient.post(`/comments/discussion/${discussionId}/user/${user?.id}`, { content });
  return response.data;
};

// Función para obtener los comentarios de una discusión
export const getComments = async (discussionId) => {
  const response = await apiClient.get(`/comments/discussion/${discussionId}`);
  return response.data;
};
