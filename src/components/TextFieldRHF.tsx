import { TextField, type TextFieldProps } from '@mui/material';
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form';

type Props<T extends FieldValues> = {
  name: Path<T>;
} & Pick<TextFieldProps, 'label' | 'disabled' | 'type'>;

export default function TextFieldRHF<T extends FieldValues>({
  name,
  ...props
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
          {...props}
        />
      )}
    />
  );
}
