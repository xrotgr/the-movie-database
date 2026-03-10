import { tvShowsApi } from '@/api/tv-shows';
import { Badge } from '@/components/ui/badge';
import type { TvShow } from '@/types';
import { genresStringify, getRating } from '@/utils/utils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tv/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    return tvShowsApi.getTvShowById(params.id);
  },
});

function RouteComponent() {
  const baseURL = 'https://image.tmdb.org/t/p/';
  const movie: TvShow = Route.useLoaderData();
  const rating = getRating(movie.vote_average);
  const genres = genresStringify(movie.genres);

  return (
    <div className="relative h-120 w-full">
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url(${baseURL}/w1280/${movie.backdrop_path})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-cover bg-neutral-950 opacity-70"></div>
      <div className="flex py-8 absolute inset-0 z-10 container mx-auto">
        <img
          className="rounded-md w-70"
          src={`${baseURL}/w342/${movie.poster_path}`}
          alt={movie.name}
        />
        <div className="pl-10 text-primary-foreground">
          <h2 className="font-bold text-3xl mb-5">{`${movie.name}`}</h2>
          <div className="mb-5">{genres}</div>
          <div className="mb-5">
            {rating && (
              <>
                <Badge className="text-lg mr-3" variant={'secondary'}>
                  {rating}
                </Badge>
                <span className="text-2 xl">User Score</span>
              </>
            )}
          </div>
          {movie.tagline && (
            <h3 className="text-lg mb-5 text-neutral-400 italic">
              {movie.tagline}
            </h3>
          )}
          {movie.overview && (
            <>
              <h2 className="font-bold text-xl mb-3">Overview</h2>
              <p className="text-base">{movie.overview}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
