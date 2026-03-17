import { useNavigate } from '@tanstack/react-router';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import type { Genre } from '@/types';
import { apiClient } from '@/api/config';

export type ContentType = 'movie' | 'tv';

interface FilterProps {
  contentType: ContentType;
}

export const Filters = ({ contentType }: FilterProps) => {
  const [genres, setGenres] = useState<Genre[]>();
  const [selected, setSelected] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await apiClient.get(`/genre/${contentType}/list`);
      setGenres(response.data.genres);
    };
    fetchGenres();
  }, [contentType]);

  const toggleGenre = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleApply = () => {
    if (contentType === 'movie' || contentType === 'tv') {
      navigate({
        from: `/${contentType}/` as const,
        search: {
          with_genres: selected.length > 0 ? selected.join(',') : undefined,
        },
      });
    }
  };

  return (
    <div className="flex flex-col min-w-3xs border-2 size-fit rounded-2xl p-4 mr-11">
      <h2 className="text-2xl mb-4">Filters</h2>
      <h3 className="text-lg text-gray-700">Genres</h3>
      {genres?.map((genre) => {
        const genreSelected = selected.includes(genre.id);
        const bg = genreSelected ? 'bg-sky-400' : 'bg-white';
        const color = genreSelected ? 'text-white' : 'text-current';
        const hover = !genreSelected ? 'hover:bg-sky-400 hover:text-white' : '';
        return (
          <button
            key={genre.id}
            className={`${bg} ${color} ${hover} border-2 rounded-2xl mb-2 p-1`}
            onClick={() => toggleGenre(genre.id)}
          >
            {genre.name}
          </button>
        );
      })}

      <Button
        className="rounded-2xl"
        onClick={() => {
          handleApply();
        }}
      >
        Search
      </Button>
    </div>
  );
};
