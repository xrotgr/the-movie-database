import { tvShowsApi } from '@/api/tv-shows';
import { MoviesGrid } from '@/components/MoviesGrid';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tv/airing-today')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MoviesGrid
      name="TV Shows Airing Today"
      queryKey={['tv-shows-airing-today']}
      queryFn={tvShowsApi.getAiringToday}
    />
  );
}
