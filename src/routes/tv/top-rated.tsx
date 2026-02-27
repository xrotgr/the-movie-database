import { tvShowsApi } from '@/api/tv-shows';
import { MoviesGrid } from '@/components/MoviesGrid';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tv/top-rated')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MoviesGrid
      name="Top Rated TV Shows"
      queryKey={['tv-top-rated']}
      queryFn={tvShowsApi.getTopRated}
    />
  );
}
