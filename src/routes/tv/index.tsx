import { tvShowsApi } from '@/api/tv-shows';
import { ContentWrapper } from '@/components/ContentWrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tv/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentWrapper
      name="Popular TV Shows"
      queryKey={['tv-shows-popular']}
      queryFn={tvShowsApi.getPopular}
    />
  );
}
