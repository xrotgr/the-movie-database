import { moviesApi } from '@/api/movies';
import { ContentWrapper } from '@/components/ContentWrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/movie/top-rated')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentWrapper
      name="Top rated movies"
      queryKey={['movies-top-rated']}
      queryFn={moviesApi.getTopRated}
    />
  );
}
