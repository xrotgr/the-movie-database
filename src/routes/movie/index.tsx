import { moviesApi } from '@/api/movies';
import { ContentWrapper } from '@/components/ContentWrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/movie/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentWrapper
      queryKey={['movies-popular']}
      queryFn={moviesApi.getPopular}
      name="Popular movies"
    />
  );
}
