import { moviesApi } from '@/api/movies';
import { MoviesGrid } from '@/components/MoviesGrid';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/movie/upcoming')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MoviesGrid
      name="Upcoming movies"
      queryKey={['movies-upcoming']}
      queryFn={moviesApi.getUpcoming}
    />
  );
}
