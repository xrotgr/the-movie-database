import { moviesApi } from '@/api/movies';
import { MoviesGrid } from '@/components/MoviesGrid';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/movie/now-playing')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MoviesGrid
      queryKey={['movies-now-playing']}
      queryFn={moviesApi.getNowPlaying}
      name="Now playing movies"
    />
  );
}
