import { moviesApi } from '@/api/movies';
import { MoviesGrid } from '@/components/MoviesGrid';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/movie/top-rated')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MoviesGrid
      name="Top rated movies"
      queryKey={['movies-top-rated']}
      queryFn={moviesApi.getTopRated}
    />
  );
}
