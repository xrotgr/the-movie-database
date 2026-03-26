import { moviesApi } from '@/api/movies';
import { ContentWrapper } from '@/components/ContentWrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/movie/now-playing')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentWrapper
      queryKey={['movies-now-playing']}
      queryFn={moviesApi.getNowPlaying}
      name="Now playing movies"
    />
  );
}
