import type { ContentType } from '@/components/Filters';
import { apiClient } from './config';

interface FetchWithGenresInterface {
  pageParam: number;
  genres: string;
  contentType: ContentType;
}

export const fetchWithGenres = async ({
  pageParam = 1,
  genres = '',
  contentType,
}: FetchWithGenresInterface) => {
  const response = await apiClient.get(`/discover/${contentType}`, {
    params: { language: 'en-US', page: pageParam, with_genres: genres },
  });
  return response.data;
};
