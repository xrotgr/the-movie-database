export interface Movie {
  id: number;
  title: string;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: string;
  tagline: string;
  overview: string;
  genres: Genre[];
  release_date: string;
  runtime: string;
}

export interface TvShow {
  id: number;
  name: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: string;
  tagline: string;
  overview: string;
  genres: Genre[];
  first_air_date: string;
}

export interface Genre {
  id: number;
  name: string;
}
