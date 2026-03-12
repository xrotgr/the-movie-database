import { Badge } from '@/components/ui/badge';

interface MovieDetailsProps {
  title: string;
  genres: string;
  rating: string;
  tagline: string;
  overview: string;
  backgroundImage: string;
  posterPath: string;
  releaseYear: string;
  runtime?: string | null;
  releaseDate?: string;
}

export const MovieDetails = ({
  title,
  genres,
  rating,
  tagline,
  overview,
  backgroundImage,
  posterPath,
  runtime,
  releaseYear,
  releaseDate,
}: MovieDetailsProps) => {
  const info = [releaseDate, genres, runtime].filter((item) => item);

  return (
    <div className="relative h-120 w-full">
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage,
        }}
      ></div>
      <div className="absolute inset-0 bg-cover bg-neutral-950 opacity-70"></div>
      <div className="flex py-8 absolute inset-0 z-10 container mx-auto">
        <img className="rounded-md w-70" src={posterPath} alt={title} />
        <div className="pl-10 text-primary-foreground">
          {title && (
            <h2 className="font-bold text-3xl mb-5">
              <span>{title}</span> <span>{'(' + releaseYear + ')'}</span>
            </h2>
          )}
          <ul className="flex gap-9 list-disc">
            {info.map((item, index) => {
              if (item && index === 0) {
                return (
                  <li key={index} className="list-none mb-5">
                    {item}
                  </li>
                );
              }

              if (item)
                return (
                  <li key={index} className="mb-5">
                    {item}
                  </li>
                );
            })}
          </ul>
          <div className="mb-5">
            {rating && (
              <>
                <Badge className="text-lg mr-3" variant={'secondary'}>
                  {rating}
                </Badge>
                <span className="text-2 xl">User Score</span>
              </>
            )}
          </div>
          {tagline && (
            <h3 className="text-lg mb-5 text-neutral-400 italic">{tagline}</h3>
          )}
          {overview && (
            <>
              <h2 className="font-bold text-xl mb-3">Overview</h2>
              <p className="text-base">{overview}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
