import type { Movie } from '@/types';
import { Card, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { FormatDate } from './FormatDate';

const baseURL = 'https://image.tmdb.org/t/p/';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const rating = Math.round(Number(movie.vote_average) * 10) + '%';

  return (
    <Card className="bg-primary text-primary-foreground container lg:px-8">
      <img
        src={`${baseURL}/w342/${movie.poster_path}`}
        alt={movie.original_title}
      />
      <Badge variant="secondary">{rating}</Badge>
      <CardTitle>{movie.original_title}</CardTitle>
      <FormatDate date={movie.release_date} />
    </Card>
  );
};
