import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { Slider, Typography, type SliderProps } from '@mui/material';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
} & Pick<SliderProps, 'min' | 'max'>;

export default function SliderRHF<T extends FieldValues>({
  name,
  label,
  ...props
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <Typography>{label}</Typography>
          <Slider {...field} valueLabelDisplay='auto' {...props} />
        </>
      )}
    />
  );
}
