import apiClient from "./api/apiClient";


export const getNewsService = async () => {
    try {
      const response = await apiClient.get('/news');
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar notícias',
        status: error.response?.status || 500
      };
    }
};