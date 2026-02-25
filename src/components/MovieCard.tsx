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

  return (
    <Card className={`${shadow ? '' : 'shadow-none'} border-0 py-0`}>
      <img
        ref={ref}
        className="rounded-md"
        src={`${baseURL}/w342/${movie.poster_path}`}
        alt={movie.original_title}
      />
      <div className="leading-10 px-2">
        <Badge variant="secondary">{rating}</Badge>
        <CardTitle>{movie.original_title}</CardTitle>
        {movie.release_date && <FormatDate date={movie.release_date} />}
      </div>
    </Card>
  );
};
