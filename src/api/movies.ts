import type { Movie } from '@/types';
import { apiClient } from './config';

export interface PopularMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const moviesApi = {
  async getPopular({ pageParam = 1 }) {
    const { data } = await apiClient.get('/popular', {
      params: {
        language: 'en-US',
        page: pageParam,
      },
    });
    return data;
  },

  async getNowPlaying({ pageParam = 1 }) {
    const { data } = await apiClient.get('/now_playing', {
      params: {
        language: 'en-US',
        page: pageParam,
      },
    });
    return data;
  },

  async getTopRated({ pageParam = 1 }) {
    const { data } = await apiClient.get('/top_rated', {
      params: {
        language: 'en-US',
        page: pageParam,
      },
    });
    return data;
  },

  async getUpcoming({ pageParam = 1 }) {
    const { data } = await apiClient.get('/upcoming', {
      params: {
        language: 'en-US',
        page: pageParam,
      },
    });
    return data;
  },
};
