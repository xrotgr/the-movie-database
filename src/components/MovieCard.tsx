import type { Movie } from '@/types';
import { Card, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { FormatDate } from './FormatDate';
import type { RefObject } from 'react';

const baseURL = 'https://image.tmdb.org/t/p/';

interface MovieCardProps {
  movie: Movie;
  shadow?: boolean;
  ref?: RefObject<null>;
}

export const MovieCard = ({ movie, shadow, ref }: MovieCardProps) => {
  const rating =
    movie.vote_average != '0'
      ? Math.round(Number(movie.vote_average) * 10) + '%'
      : 'NR';
  const releaseDate = movie.first_air_date ?? movie.release_date;
  return (
    <Card className={`${shadow ? '' : 'shadow-none'} border-0 py-0 pb-0.5`}>
      <img
        ref={ref}
        className="rounded-md"
        src={`${baseURL}/w342/${movie.poster_path}`}
        alt={movie.original_title ?? movie.original_name}
      />
      <div className="leading-10 px-2">
        <Badge variant="secondary">{rating}</Badge>
        <CardTitle>{movie.original_title ?? movie.original_name}</CardTitle>
        {releaseDate && <FormatDate date={releaseDate} />}
      </div>
    </Card>
  );
};
