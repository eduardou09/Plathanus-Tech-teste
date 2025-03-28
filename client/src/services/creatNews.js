import apiClient from './api/apiClient';


export const createNewsService = async (data) => {
    try {
      const response = await apiClient.post('/news', data);
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao criar notícia',
        status: error.response?.status || 500
      };
    }
  };