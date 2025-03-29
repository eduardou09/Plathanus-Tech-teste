import { create } from 'zustand';
import apiClient from '../services/api/apiClient';
import { deleteNewsService } from '../services/deleteNews';
import { updateNews } from '../services/updateNews';
import { createNewsService } from '../services/creatNews';
import { getNewsService } from '../services/getNews';




const useNewsStore = create((set) => ({
  news: [],
  isLoading: false,
  error: null,
  editValues: null, 

   setEditValues: (values) => set({ editValues: values }),

   
   clearEditValues: () => set({ editValues: null }),

  fetchNews: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getNewsService();
      set({ news: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Erro ao buscar notícias', isLoading: false });
    }
  },

  createNewsStore: async (data) => {

    try {
      const response = await createNewsService(data);    
      if (response.success) {
        // Atualiza a lista de notícias chamando fetchNews()
        await useNewsStore.getState().fetchNews();
      }
      return {
        success: response.success,
        data: response.data,
        error: response.error
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Erro ao criar notícia'
      };
    }
  },

  
    deleteNews: async (id) => {
      set({ isLoading: true, error: null });
  
      const result = await deleteNewsService(id); 
  
      if (result.success) {
     
        set((state) => ({
          news: state.news.filter((item) => item.id !== id),
          isLoading: false,
        }));
      } else {
        set({ error: result.error, isLoading: false });
      }
  
      return result; 
    },


    
    updateNewsStore: async (id, updatedData) => {
      set({ isLoading: true, error: null });
      
      const result = await updateNews(id, updatedData); 

      if (result.success) {
      
        set((state) => ({
          news: state.news.map((item) =>
            item.id === id ? { ...item, ...result.data } : item
          ),
          isLoading: false,
        }));
      } else {
        set({ error: result.error, isLoading: false });
      }
  
      return result; 
    },
}));





export default useNewsStore;
