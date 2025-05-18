import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import type { Option } from '../types/option';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

export default function ToggleButtonGroupRHF<T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value, ...restFields },
        fieldState: { error },
      }) => (
        <FormControl error={!!error} sx={{ gap: 1 }}>
          <FormLabel>{label}</FormLabel>
          <ToggleButtonGroup
            onChange={(_, newValue) => newValue.length && onChange(newValue)}
            value={value.length ? value : [options?.[0].id]}
          >
            {options?.map((option) => (
              <ToggleButton
                key={option.id}
                value={option.id}
                {...restFields}
                sx={{ textTransform: 'none' }}
              >
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    ></Controller>
  );
}
