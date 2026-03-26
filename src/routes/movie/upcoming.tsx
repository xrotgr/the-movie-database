import { moviesApi } from '@/api/movies';
import { ContentWrapper } from '@/components/ContentWrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/movie/upcoming')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentWrapper
      name="Upcoming movies"
      queryKey={['movies-upcoming']}
      queryFn={moviesApi.getUpcoming}
    />
  );
}
