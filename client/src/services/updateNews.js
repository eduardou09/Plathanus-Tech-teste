// services/newsService.js
import apiClient from './api/apiClient';

// Função para atualizar uma notícia
export const updateNews = async (id, data) => {
  try {
    const response = await apiClient.put(`/news/${id}`, data); // ou PATCH, dependendo da API
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Erro ao atualizar notícia',
    };
  }
};