import { apiClient } from './config';

export const tvShowsApi = {
  async getPopular({ pageParam = 1 }) {
    const { data } = await apiClient.get('/tv/popular', {
      params: {
        language: 'en-US',
        page: pageParam,
      },
    });
    return data;
  },

  async getOnTheAir({ pageParam = 1 }) {
    const { data } = await apiClient.get('/tv/on_the_air', {
      params: {
        language: 'en-US',
        page: pageParam,
      },
    });
    return data;
  },

  async getTopRated({ pageParam = 1 }) {
    const { data } = await apiClient.get('/tv/top_rated', {
      params: {
        language: 'en-US',
        page: pageParam,
      },
    });
    return data;
  },

  async getAiringToday({ pageParam = 1 }) {
    const { data } = await apiClient.get('/tv/airing_today', {
      params: {
        language: 'en-US',
        page: pageParam,
      },
    });
    return data;
  },
};
