import { useQuery } from '@tanstack/react-query';
import { MovieCard } from './MovieCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from './ui/carousel';
import axios from 'axios';
import type { Movie } from '@/types';

const apiKey = import.meta.env.VITE_API_KEY;

const fetchPopular = async () => {
  try {
    const { data } = await axios.get(
      'https://api.themoviedb.org/3/movie/popular',
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );
    return data.results;
  } catch (e) {
    console.log(e);
  }
};

export const MyCarousel = () => {
  const { data: movies } = useQuery({
    queryKey: ['popular'],
    queryFn: fetchPopular,
  });

  return (
    <Carousel
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {movies?.map((movie: Movie) => (
          <CarouselItem key={movie.id} className="basis-1/4">
            <MovieCard movie={movie} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
