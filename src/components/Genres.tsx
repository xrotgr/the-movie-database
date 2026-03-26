import { apiClient } from '@/api/config';
import type { Genre } from '@/types';
import { memo, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Separator } from './ui/separator';

interface GenresProps {
  selected: number[];
  onToggle: React.Dispatch<React.SetStateAction<number[]>>;
  contentType: string;
}

export const Genres = memo(
  ({ selected, onToggle, contentType }: GenresProps) => {
    const [genres, setGenres] = useState<Genre[]>();

    useEffect(() => {
      const fetchGenres = async () => {
        const response = await apiClient.get(`/genre/${contentType}/list`);
        setGenres(response.data.genres);
      };
      fetchGenres();
    }, [contentType]);

    const toggleGenre = (id: number) => {
      const nextSelected = selected.includes(id)
        ? selected.filter((i) => i !== id)
        : [...selected, id];
      onToggle(nextSelected);
    };

    return (
      <>
        <Accordion type="multiple">
          <AccordionItem value="genres">
            <AccordionTrigger className="text-lg text-gray-700">
              Genres
            </AccordionTrigger>
            <Separator className="mb-3" />
            <AccordionContent className="my-2">
              {genres?.map((genre) => {
                const genreSelected = selected.includes(genre.id);
                const bg = genreSelected ? 'bg-sky-400' : 'bg-white';
                const color = genreSelected ? 'text-white' : 'text-current';
                const hover = !genreSelected
                  ? 'hover:bg-sky-400 hover:text-white'
                  : '';
                return (
                  <button
                    key={genre.id}
                    className={`${bg} ${color} ${hover} border-2 rounded-2xl m-1 px-3 py-1`}
                    onClick={() => toggleGenre(genre.id)}
                  >
                    {genre.name}
                  </button>
                );
              })}
              <Separator className="mt-4" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    );
  },
);
