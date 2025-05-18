import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { Slider, Typography } from '@mui/material';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

export default function SliderRHF<T extends FieldValues>({
  name,
  label,
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <Typography>{label}</Typography>
          <Slider {...field} valueLabelDisplay='auto' max={3000} min={100} />
        </>
      )}
    />
  );
}
