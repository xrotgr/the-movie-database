import { useQuery } from '@tanstack/react-query';
import { MovieCard } from './MovieCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from './ui/carousel';
import type { Movie } from '@/types';
import { moviesApi } from '@/api/movies';

interface MyCarouselProps {
  name: string;
}

export const MyCarousel = ({ name }: MyCarouselProps) => {
  const pageParam = 1;
  const { data, isLoading, isError } = useQuery({
    queryKey: ['popular', pageParam],
    queryFn: () => moviesApi.getPopular({ pageParam }),
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error occurred</div>;
  }

  const movies = data.results;

  return (
    <div className="container mx-auto px-12 md:px-10 lg:px-8">
      <h1 className="font-bold text-xl mb-4 ml-6">{name}</h1>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {movies?.map((movie: Movie) => (
            <CarouselItem
              key={movie.id}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/7"
            >
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
