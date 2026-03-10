import type { Movie } from '@/types';
import { apiClient } from './config';

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const moviesApi = {
  async getPopular({ pageParam = 1 }) {
    const { data } = await apiClient.get('/movie/popular', {
      params: {
        language: 'en-US',
        page: pageParam,
      },
    });
    return data;
  },

  async getNowPlaying({ pageParam = 1 }) {
    const { data } = await apiClient.get('/movie/now_playing', {
      params: {
        language: 'en-US',
        page: pageParam,
      },
    });
    return data;
  },

  async getTopRated({ pageParam = 1 }) {
    const { data } = await apiClient.get('/movie/top_rated', {
      params: {
        language: 'en-US',
        page: pageParam,
      },
    });
    return data;
  },

  async getUpcoming({ pageParam = 1 }) {
    const { data } = await apiClient.get('/movie/upcoming', {
      params: {
        language: 'en-US',
        page: pageParam,
      },
    });
    return data;
  },

  async getMovieById(movieId: string) {
    const { data } = await apiClient.get(`movie/${movieId}`);
    return data;
  },
};
