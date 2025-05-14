import { useFormContext, type FieldValues } from 'react-hook-form';
import { type FormValues } from '../types/schema';

import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import AutocompleteRHF from '../../components/AutocompleteRHF';

export default function Users() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<FormValues>();

  // Form submission handler
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap: 2 }}>
        <TextField
          label='Name'
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label='Email'
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <AutocompleteRHF<FormValues>
          name='states'
          options={[
            { id: '1', label: 'Kyiv' },
            { id: '2', label: 'Lviv' },
            { id: '3', label: 'Qwe' },
          ]}
          label='States'
        />
      </Stack>
    </form>
  );
}
