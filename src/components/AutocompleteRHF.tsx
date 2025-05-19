import { Autocomplete, Box, Checkbox, TextField } from '@mui/material';
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import type { Option } from '../types/option';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
  disabled?: boolean;
};

export default function AutocompleteRHF<T extends FieldValues>({
  name,
  options,
  label,
  disabled,
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <Autocomplete
          options={options || []}
          value={value.map((id: number) =>
            options?.find((item) => item.id === id)
          )}
          onChange={(_, newValue) => onChange(newValue.map((item) => item.id))}
          getOptionLabel={(option: Option) =>
            options?.find((item) => item.id === option.id)?.label ?? ''
          }
          disableCloseOnSelect
          disabled={disabled}
          multiple
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              inputRef={ref}
              error={!!error}
              helperText={error?.message}
              label={label}
            />
          )}
          renderOption={(props, option, { selected }) => {
            const { key, ...otherProps } = props;
            return (
              <Box component='li' key={key} {...otherProps}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                  checked={selected}
                />
                {option.label}
              </Box>
            );
          }}
        />
      )}
    />
  );
}
