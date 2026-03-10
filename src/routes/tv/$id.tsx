import { tvShowsApi } from '@/api/tv-shows';
import { MovieDetails } from '@/components/MovieDetails';
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
  const releaseYear = movie.first_air_date.split('-')[0];

  return (
    <>
      <MovieDetails
        title={movie.name}
        genres={genres}
        rating={rating}
        tagline={movie.tagline}
        overview={movie.overview}
        backgroundImage={`url(${baseURL}/w1280/${movie.backdrop_path})`}
        posterPath={`${baseURL}/w342/${movie.poster_path}`}
        releaseYear={releaseYear}
      />
    </>
  );
}
