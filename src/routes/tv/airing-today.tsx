import { tvShowsApi } from '@/api/tv-shows';
import { ContentWrapper } from '@/components/ContentWrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tv/airing-today')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentWrapper
      name="TV Shows Airing Today"
      queryKey={['tv-shows-airing-today']}
      queryFn={tvShowsApi.getAiringToday}
    />
  );
}
