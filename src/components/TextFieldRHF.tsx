import { TextField } from '@mui/material';
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

export default function TextFieldRHF<T extends FieldValues>({
  name,
  label,
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          error={!!error}
          helperText={error?.message}
          label={label}
        />
      )}
    />
  );
}
