import type { ContentType } from '@/components/Filters';
import { apiClient } from './config';

interface FetchDiscoverInterface {
  pageParam: number;
  contentType: ContentType;
  voteAverageGte?: string;
  voteAverageLte?: string;
  runtimeGte?: string;
  runtimeLte?: string;
  voteCountGte?: string;
  genres?: string;
}

export const fetchDiscover = async ({
  pageParam,
  contentType,
  voteAverageGte,
  voteAverageLte,
  runtimeGte,
  runtimeLte,
  voteCountGte,
  genres,
}: FetchDiscoverInterface) => {
  const response = await apiClient.get(`/discover/${contentType}`, {
    params: {
      language: 'en-US',
      page: pageParam,
      'vote_average.gte': voteAverageGte || undefined,
      'vote_average.lte': voteAverageLte || undefined,
      'with_runtime.gte': runtimeGte || undefined,
      'with_runtime.lte': runtimeLte || undefined,
      'vote_count.gte': voteCountGte || undefined,
      with_genres: genres || undefined,
    },
  });
  return response.data;
};
