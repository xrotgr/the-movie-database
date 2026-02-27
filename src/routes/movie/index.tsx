import { moviesApi } from '@/api/movies';
import { MoviesGrid } from '@/components/MoviesGrid';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/movie/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MoviesGrid
      queryKey={['movies-popular']}
      queryFn={moviesApi.getPopular}
      name="Popular movies"
    />
  );
}
