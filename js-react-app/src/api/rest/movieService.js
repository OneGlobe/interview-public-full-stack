import { api } from ".";

export const movieService = {
  create: async (movie) => {
    const response = await api.post('/movies', movie);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/movies');
    const content = response.data.content;
    return content; 
  },

  findByTitle: async (title) => {
    const response = await api.get(`/movies/search?title=${title}`);
    const content = response.data.content;
    return content; 
  }
};