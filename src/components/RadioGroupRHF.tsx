import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import type { Option } from '../types/option';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormHelperText from '@mui/material/FormHelperText';
import { FormControlLabel, Radio } from '@mui/material';

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

export default function RadioGroupRHF<T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, ...otherField }, fieldState: { error } }) => (
        <FormControl {...otherField} error={!!error}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup value={value}>
            {options?.map((option) => (
              <FormControlLabel
                key={option.id}
                value={+option.id}
                control={<Radio checked={+value === +option.id} />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    ></Controller>
  );
}
