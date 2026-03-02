import { tvShowsApi } from '@/api/tv-shows';
import { MoviesGrid } from '@/components/MoviesGrid';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tv/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MoviesGrid
      name="Popular TV Shows"
      queryKey={['tv-shows-popular']}
      queryFn={tvShowsApi.getPopular}
    />
  );
}
