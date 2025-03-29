import apiClient from "./api/apiClient";

export const deleteNewsService = async (id) => {
    try {
        const response = await apiClient.delete(`/news/${id}`);
      
        return { success: true };;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao excluir notícia',
        status: error.response?.status || 500,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      };
    }
};