import { memo } from 'react';
import { Slider } from './ui/slider';
import { Separator } from './ui/separator';

interface SliderControlled {
  name: string;
  min?: number;
  max: number;
  step: number;
  value: number[];
  onChange: (value: number[]) => void;
}

export const SliderControlled = memo(
  ({ name, min, max, step, value, onChange }: SliderControlled) => {
    const handleChange = (value: number[]) => {
      onChange(value);
    };

    const text =
      value.length === 2 ? 'In range: ' + value.join('-') : 'Minimum: ' + value;

    return (
      <div className="mx-auto grid w-full max-w-xs gap-3">
        <p>{name}</p>
        <span className="text-sm text-muted-foreground">{text}</span>
        <Slider
          value={value}
          onValueChange={handleChange}
          min={min}
          max={max}
          step={step}
        />
        <Separator className="mb-3" />
      </div>
    );
  },
);
