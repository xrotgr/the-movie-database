import type { Movie } from '@/types';
import { MovieCard } from './MovieCard';
import { Button } from './ui/button';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { type MoviesResponse } from '@/api/movies';
import { useLocation } from '@tanstack/react-router';

interface MoviesGridProps {
  queryKey: string[];
  queryFn: (params: { pageParam: number }) => Promise<MoviesResponse>;
}

export const MoviesGrid = ({ queryKey, queryFn }: MoviesGridProps) => {
  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey,
      queryFn,
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

  const location = useLocation();
  const pathName = location.pathname;
  let link;
  if (pathName.startsWith('/tv')) {
    link = '/tv/$id';
  } else if (pathName.startsWith('/movie')) {
    link = '/movie/$id';
  } else {
    link = '';
  }

  if (status === 'pending') {
    return <div>Loading</div>;
  }

  if (status === 'error') {
    return <div>Error occurred</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-5 gap-4 mb-5">
        {movies?.map((movie: Movie, index) => {
          if (movies.length === index + 1) {
            return (
              <MovieCard
                link={link}
                ref={observerRef}
                key={movie.id}
                movie={movie}
                shadow
              />
            );
          }
          return <MovieCard link={link} key={movie.id} movie={movie} shadow />;
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
