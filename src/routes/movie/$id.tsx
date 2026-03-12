import { moviesApi } from '@/api/movies';
import { MovieDetails } from '@/components/MovieDetails';
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
    <MovieDetails
      title={movie.title}
      genres={genres}
      rating={rating}
      tagline={movie.tagline}
      overview={movie.overview}
      backgroundImage={`url(${baseURL}/w1280/${movie.backdrop_path})`}
      posterPath={`${baseURL}/w342/${movie.poster_path}`}
      runtime={runtime}
      releaseYear={releaseYear}
      releaseDate={releaseDate}
    />
  );
}
