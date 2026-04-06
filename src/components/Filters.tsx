import { useNavigate } from '@tanstack/react-router';
import { Button } from './ui/button';
import { useCallback, useMemo, useState } from 'react';
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

  const userScoreSliderHandler = useCallback((arr: number[]) => {
    setVoteAverageGte(arr[0]);
    setVoteAverageLte(arr[1]);
  }, []);

  const userScoreValue = useMemo(
    () => [voteAverageGte, voteAverageLte],
    [voteAverageGte, voteAverageLte],
  );

  const runtimeSliderHandler = useCallback((arr: number[]) => {
    setRuntimeGte(arr[0]);
    setRuntimeLte(arr[1]);
  }, []);

  const runtimeValue = useMemo(
    () => [runtimeGte, runtimeLte],
    [runtimeGte, runtimeLte],
  );

  const voteCountSliderHandler = useCallback((arr: number[]) => {
    setVoteCountGte(arr[0]);
  }, []);

  const voteCountsValue = useMemo(() => [voteCountGte], [voteCountGte]);

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
                value={userScoreValue}
                onChange={userScoreSliderHandler}
                name="User score"
                min={0}
                max={10}
                step={1}
              />
              <SliderControlled
                value={voteCountsValue}
                onChange={voteCountSliderHandler}
                name="Minimum User Votes"
                max={500}
                step={50}
              />
              <SliderControlled
                value={runtimeValue}
                onChange={runtimeSliderHandler}
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
