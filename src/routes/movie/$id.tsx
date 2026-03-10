import { moviesApi } from '@/api/movies';
import { Badge } from '@/components/ui/badge';
import type { Movie } from '@/types';
import { genresStringify, getRating, timeStringify } from '@/utils/utils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/movie/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    return moviesApi.getMovieById(params.id);
  },
});

function RouteComponent() {
  const baseURL = 'https://image.tmdb.org/t/p/';
  const movie: Movie = Route.useLoaderData();
  const releaseYear = movie.release_date.split('-')[0];
  const releaseDate = movie.release_date.split('-').reverse().join('/');

  const runtime = timeStringify(movie.runtime);
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
          alt={movie.title}
        />
        <div className="pl-10 text-primary-foreground">
          <h2 className="font-bold text-3xl mb-5">
            {`${movie.title} (${releaseYear})`}
          </h2>
          <ul className="flex gap-9 list-disc">
            {releaseDate && <li className="list-none mb-5">{releaseDate}</li>}
            {genres && <li className="mb-5">{genres}</li>}
            {runtime && <li className="mb-5">{runtime}</li>}
          </ul>
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
