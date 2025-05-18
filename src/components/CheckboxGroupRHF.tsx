import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import type { Option } from '../types/option';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

export default function CheckboxGroupRHF<T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <FormLabel>{label}</FormLabel>
          <FormGroup>
            {options?.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.id}
                control={
                  <Checkbox
                    checked={value.includes(option.id)}
                    key={option.label}
                  />
                }
                onChange={() =>
                  value.includes(option.id)
                    ? onChange(
                        value.filter((item: number) => item !== option.id)
                      )
                    : onChange([...value, option.id])
                }
                label={option.label}
              />
            ))}
          </FormGroup>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    ></Controller>
  );
}
