import type { MoviesResponse } from '@/api/movies';
import { Filters } from './Filters';
import { MoviesGrid } from './MoviesGrid';
import { useLocation, useSearch } from '@tanstack/react-router';
import { fetchWithGenres } from '@/api/api';

interface ContentWrapperProps {
  name: string;
  queryKey: string[];
  queryFn: (params: { pageParam: number }) => Promise<MoviesResponse>;
}

interface Search {
  with_genres: string;
}

export const ContentWrapper = ({
  queryKey,
  queryFn,
  name,
}: ContentWrapperProps) => {
  const search: Search = useSearch({ strict: false });
  const genres = search.with_genres;

  const location = useLocation();
  const pathName = location.pathname;
  const contentType = pathName.split('/')[1];

  if (contentType !== 'movie' && contentType !== 'tv') {
    return <div>Error occurred</div>;
  }

  if (search.with_genres) {
    queryKey = ['movies', search.with_genres];
    queryFn = async ({ pageParam = 1 }) =>
      fetchWithGenres({ pageParam, genres, contentType });
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
