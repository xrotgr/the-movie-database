import { tvShowsApi } from '@/api/tv-shows';
import { ContentWrapper } from '@/components/ContentWrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tv/on-the-air')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentWrapper
      name="Currently Airing TV Shows"
      queryKey={['tv-on-the-air']}
      queryFn={tvShowsApi.getOnTheAir}
    />
  );
}
