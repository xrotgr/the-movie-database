import { tvShowsApi } from '@/api/tv-shows';
import { ContentWrapper } from '@/components/ContentWrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tv/top-rated')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentWrapper
      name="Top Rated TV Shows"
      queryKey={['tv-top-rated']}
      queryFn={tvShowsApi.getTopRated}
    />
  );
}
