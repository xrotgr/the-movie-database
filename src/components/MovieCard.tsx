import type { Movie, TvShow } from '@/types';
import { Card, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { FormatDate } from './FormatDate';
import type { RefObject } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { getRating } from '@/utils/utils';

const baseURL = 'https://image.tmdb.org/t/p/';

interface MovieCardProps {
  link?: string;
  movie: Movie | TvShow;
  shadow?: boolean;
  ref?: RefObject<null>;
}

export const MovieCard = ({ movie, link, shadow, ref }: MovieCardProps) => {
  const location = useLocation();
  const pathName = location.pathname;

  if (!link) {
    if (pathName.startsWith('/tv')) {
      link = '/tv/$id';
    } else if (pathName.startsWith('/movie')) {
      link = '/movie/$id';
    } else {
      link = '';
    }
  }

  const rating = getRating(movie.vote_average);
  let releaseDate;
  let title;

  // if is TvShow
  if ('first_air_date' in movie) {
    releaseDate = movie.first_air_date;
    title = movie.original_name;
  } else {
    releaseDate = movie.release_date;
    title = movie.original_title;
  }

  return (
    <Card className={`${shadow ? '' : 'shadow-none'} border-0 py-0 pb-0.5`}>
      <Link to={link} params={{ id: String(movie.id) }}>
        <img
          ref={ref}
          className="rounded-md"
          src={`${baseURL}/w342/${movie.poster_path}`}
          alt={title}
        />
      </Link>
      <div className="leading-10 px-2">
        <Badge variant="secondary">{rating}</Badge>
        <Link to={link} params={{ id: String(movie.id) }}>
          <CardTitle>{title}</CardTitle>
        </Link>
        {releaseDate && <FormatDate date={releaseDate} />}
      </div>
    </Card>
  );
};
