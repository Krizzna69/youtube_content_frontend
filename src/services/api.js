import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generateTitle = async (data) => {
  try {
    const response = await api.post('/generate-title', data);
    return response.data;
  } catch (error) {
    console.error('Error generating title:', error);
    throw error;
  }
};

export const generateDescription = async (data) => {
  try {
    const response = await api.post('/generate-description', data);
    return response.data;
  } catch (error) {
    console.error('Error generating description:', error);
    throw error;
  }
};

export const suggestTags = async (data) => {
  try {
    const response = await api.post('/suggest-tags', data);
    return response.data;
  } catch (error) {
    console.error('Error suggesting tags:', error);
    throw error;
  }
};

export const generateThumbnailText = async (data) => {
  try {
    const response = await api.post('/thumbnail-text', data);
    return response.data;
  } catch (error) {
    console.error('Error generating thumbnail text:', error);
    throw error;
  }
};

export default api;