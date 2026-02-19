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

const fetchPopular = async () => {
  try {
    const { data } = await axios.get(
      'https://api.themoviedb.org/3/movie/popular',
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTU0NmRiYWJiMmViOTVmZjJkMTkzOWU0MTc1Y2YwOSIsIm5iZiI6MTc3MTI2MTgxMC44MjMsInN1YiI6IjY5OTM0ZjcyN2Y4ODRiODY2NmZhMzljMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xhznomZRII_kJRKwOoMuwVcHkXUal5dAZiW8LOUfSuo',
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
          <CarouselItem className="basis-1/4">
            <MovieCard movie={movie} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
