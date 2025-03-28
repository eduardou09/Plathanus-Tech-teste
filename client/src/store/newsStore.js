import { create } from 'zustand';
import apiClient from '../services/api/apiClient';
import { deleteNewsService } from '../services/deleteNews';


const useNewsStore = create((set) => ({
  news: [],
  isLoading: false,
  error: null,
  editValues: null, // Objeto com { id, title, content, author }
   // Função para definir os valores do formulário de edição
   setEditValues: (values) => set({ editValues: values }),

   // Função para limpar os valores (opcional)
   clearEditValues: () => set({ editValues: null }),

  fetchNews: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get('/news');
      set({ news: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Erro ao buscar notícias', isLoading: false });
    }
  },

    createNews: async (data) => {
        try {
        const response = await apiClient.post('/news', data);
        return response.data;
        } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao criar notícia');
        }
    },

    deleteNews: async (id) => {
      set({ isLoading: true, error: null });
  
      const result = await deleteNewsService(id); // Chama o serviço
  
      if (result.success) {
        // Atualiza o estado removendo a notícia deletada
        set((state) => ({
          news: state.news.filter((item) => item.id !== id),
          isLoading: false,
        }));
      } else {
        set({ error: result.error, isLoading: false });
      }
  
      return result; // Retorna o resultado para uso no componente
    },

    updateNewsStore: async (id, updatedData) => {
      set({ isLoading: true, error: null });
  
      const result = await updateNews(id, updatedData); // Chama o serviço
  
      if (result.success) {
        // Atualiza o estado local com os novos dados
        set((state) => ({
          news: state.news.map((item) =>
            item.id === id ? { ...item, ...result.data } : item
          ),
          isLoading: false,
        }));
      } else {
        set({ error: result.error, isLoading: false });
      }
  
      return result; // Retorna o resultado para uso no componente
    },
}));





export default useNewsStore;
