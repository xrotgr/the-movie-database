import type { MoviesResponse } from '@/api/movies';
import { Filters, type ContentType } from './Filters';
import { MoviesGrid } from './MoviesGrid';
import { useLocation, useSearch } from '@tanstack/react-router';
import { fetchDiscover } from '@/api/api';

interface MovieFilters {
  genres?: string;
  voteAverageGte?: string;
  voteAverageLte?: string;
  runtimeGte?: string;
  runtimeLte?: string;
}

interface Search {
  with_genres: string;
  vote_average_gte: string;
  vote_average_lte: string;
  with_runtime_gte: string;
  with_runtime_lte: string;
  vote_count_gte: string;
}

export type MovieDiscoveryKey = [ContentType, 'discover', MovieFilters];

interface ContentWrapperProps {
  name: string;
  queryKey: MovieDiscoveryKey;
  queryFn: (params: { pageParam: number }) => Promise<MoviesResponse>;
}

export const ContentWrapper = ({
  queryKey,
  queryFn,
  name,
}: ContentWrapperProps) => {
  const search: Search = useSearch({ strict: false });
  const location = useLocation();
  const pathName = location.pathname;
  const contentType = pathName.split('/')[1];

  const {
    with_genres: genres,
    vote_average_gte: voteAverageGte,
    vote_average_lte: voteAverageLte,
    with_runtime_gte: runtimeGte,
    with_runtime_lte: runtimeLte,
    vote_count_gte: voteCountGte,
  } = search;

  const filters = {
    genres,
    voteAverageGte,
    voteAverageLte,
    runtimeGte,
    runtimeLte,
    voteCountGte,
  };

  if (contentType !== 'movie' && contentType !== 'tv') {
    return <div>Error occurred</div>;
  }

  if (Object.values(filters).some((item) => item !== undefined)) {
    queryKey = [contentType, 'discover', filters];
    queryFn = async ({ pageParam = 1 }) => {
      return fetchDiscover({ pageParam, contentType, ...filters });
    };
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">{name}</h1>
      <div className="grid grid-cols-[1fr_4fr]">
        <Filters contentType={contentType} />
        <MoviesGrid queryKey={queryKey} queryFn={queryFn} />
      </div>
    </div>
  );
};
