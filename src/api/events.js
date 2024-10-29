import { apiClient } from './base';

export const createEvent = async (eventData) => {
  try {
    const response = await apiClient.post('events', eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw new Error(error);
  }
};

export const getAllEvents = async () => {
  try {
    const response = await apiClient.get('events');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error(error);
  }
};

export const getAllEventsByMonthAndYear = async (month, year) => {
  try {
    const response = await apiClient.get(`events/month/${month}/${year}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getEventById = async (id) => {
  try {
    const response = await apiClient.get(`events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    throw new Error(error);
  }
};

export const updateEvent = async (id, eventData) => {
  try {
    const response = await apiClient.put(`events/${id}`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw new Error(error);
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await apiClient.delete(`events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw new Error(error);
  }
};
