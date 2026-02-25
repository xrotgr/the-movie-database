import { createFileRoute } from '@tanstack/react-router';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MovieCard } from '@/components/MovieCard';
import type { Movie } from '@/types';
import { Button } from '@/components/ui/button';
import { fetchPopular } from '@/api/movies';
import { useEffect, useRef } from 'react';

export const Route = createFileRoute('/movie')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex">
      <MoviesGrid name="Popular movies" />
    </div>
  );
}

interface MoviesGridProps {
  name: string;
}

export const MoviesGrid = ({ name }: MoviesGridProps) => {
  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ['popular'],
      queryFn: fetchPopular,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }
      },
    });

  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );
    const currentObserver = observerRef.current;
    if (currentObserver) {
      observer.observe(currentObserver);
    }
    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [hasNextPage, isFetching, fetchNextPage]);

  const allMovies = data?.pages.flatMap((page) => page.results) || [];
  const movies = Array.from(
    new Map(allMovies.map((movie) => [movie.id, movie])).values(),
  );

  if (status === 'pending') {
    return <div>Loading</div>;
  }

  if (status === 'error') {
    return <div>Error occurred</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-4">
        {name}
      </h1>
      <div className="grid grid-cols-5 gap-4 mb-5">
        {movies?.map((movie: Movie, index) => {
          // if (movie.id === 395974) {
          //   return <MovieCard key={movie.id} movie={movie} shadow />;
          // }
          if (movies.length === index + 1) {
            return (
              <MovieCard
                ref={observerRef}
                key={movie.id}
                movie={movie}
                shadow
              />
            );
          }
          return <MovieCard key={movie.id} movie={movie} shadow />;
        })}
      </div>
      <Button
        className="w-full h-18 text-2xl"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetching}
      >
        {isFetching ? 'Loading...' : 'Load more'}
      </Button>
    </div>
  );
};
