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
import { fetchPopular } from '@/api/movies';

interface MyCarouselProps {
  name: string;
}

export const MyCarousel = ({ name }: MyCarouselProps) => {
  const pageParam = 1;
  const { data, isLoading, isError } = useQuery({
    queryKey: ['popular', pageParam],
    queryFn: () => fetchPopular({ pageParam }),
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error occurred</div>;
  }

  const movies = data.results;

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-4">
        {name}
      </h1>
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
    </div>
  );
};
