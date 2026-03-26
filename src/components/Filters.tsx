import { useNavigate } from '@tanstack/react-router';
import { Button } from './ui/button';
import { useState } from 'react';
import { SliderControlled } from './SliderControlled';
import { Genres } from './Genres';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Separator } from './ui/separator';

export type ContentType = 'movie' | 'tv';

interface FilterProps {
  contentType: ContentType;
}

export const Filters = ({ contentType }: FilterProps) => {
  const navigate = useNavigate();
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [voteAverageGte, setVoteAverageGte] = useState<number>(0);
  const [voteAverageLte, setVoteAverageLte] = useState<number>(10);
  const [runtimeGte, setRuntimeGte] = useState<number>(0);
  const [runtimeLte, setRuntimeLte] = useState<number>(400);
  const [voteCountGte, setVoteCountGte] = useState<number>(0);

  const handleApply = () => {
    if (contentType === 'movie' || contentType === 'tv') {
      navigate({
        from: `/${contentType}/` as const,
        search: {
          with_genres:
            selectedGenres.length > 0 ? selectedGenres.join(',') : undefined,
          vote_average_gte: voteAverageGte,
          vote_average_lte: voteAverageLte,
          vote_count_gte: voteCountGte,
          with_runtime_gte: runtimeGte,
          with_runtime_lte: runtimeLte,
        },
      });
    }
  };

  const handleVoteAverageSliderChange = (arr: number[]) => {
    setVoteAverageGte(arr[0]);
    setVoteAverageLte(arr[1]);
  };

  const handleRuntimeSliderChange = (arr: number[]) => {
    setRuntimeGte(arr[0]);
    setRuntimeLte(arr[1]);
  };

  const handleVoteCountSliderChange = (arr: number[]) => {
    setVoteCountGte(arr[0]);
  };

  return (
    <div className="mr-11">
      <div className="flex flex-col min-w-3xs rounded-md px-4 mb-4 border-2  ">
        <Accordion type="multiple">
          <AccordionItem value="filters">
            <AccordionTrigger className="text-lg mb-4">
              Filters
            </AccordionTrigger>
            <Separator />
            <AccordionContent>
              <Genres
                selected={selectedGenres}
                onToggle={setSelectedGenres}
                contentType={contentType}
              />
              <SliderControlled
                value={[voteAverageGte, voteAverageLte]}
                onChange={handleVoteAverageSliderChange}
                name="User score"
                min={0}
                max={10}
                step={1}
              />
              <SliderControlled
                value={[voteCountGte]}
                onChange={handleVoteCountSliderChange}
                name="Minimum User Votes"
                max={500}
                step={50}
              />
              <SliderControlled
                value={[runtimeGte, runtimeLte]}
                onChange={handleRuntimeSliderChange}
                name="Runtime"
                min={0}
                max={400}
                step={15}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <Button className="text-xl w-full h-11 rounded-2xl" onClick={handleApply}>
        Search
      </Button>
    </div>
  );
};
