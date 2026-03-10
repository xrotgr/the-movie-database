import type { Genre } from '@/types';

export const getRating = (voteAverage: string | number) => {
  return voteAverage != '0' ? Math.round(Number(voteAverage) * 10) + '%' : 'NR';
};

export const timeStringify = (minutesRuntime: string | number) => {
  if (minutesRuntime === 0) {
    return null;
  }
  const runtime = Number(minutesRuntime);
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
};

export const genresStringify = (genres: Genre[]) => {
  const newGenres = genres.map((genre, index, arr) => {
    if (arr.length === 1) return genre.name;
    if (arr.length - 1 === index) return 'and ' + genre.name;
    if (arr.length - 2 === index) return genre.name + ' ';

    return genre.name + ', ';
  });
  return newGenres.join('');
};
