import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { Typography } from '@mui/material';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

export default function DateRangePickerRHF<T extends FieldValues>({
  name,
  label,
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...restField } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Typography>{label}</Typography>
          <DateRangePicker
            {...restField}
            value={Array.isArray(value) ? value : [null, null]}
          />
        </LocalizationProvider>
      )}
    />
  );
}
