import { useFormContext, type FieldValues } from 'react-hook-form';
import { type FormValues } from '../types/schema';

import {
  useCities,
  useGenders,
  useLanguages,
  useSkills,
} from '../services/queries';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

import AutocompleteRHF from '../../components/AutocompleteRHF';
import ToggleButtonGroupRHF from '../../components/ToggleButtonGroup';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import RadioGroupRHF from '../../components/RadioGroupRHF';
import CheckboxGroupRHF from '../../components/CheckboxGroupRHF';

export default function Users() {
  const { data: cities, error: getCitiesError } = useCities();
  const { data: languages, error: getLanguagesError } = useLanguages();
  const { data: genders, error: getGendersError } = useGenders();
  const { data: skills, error: getSkillsError } = useSkills();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<FormValues>();

  // Form submission handler
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  useEffect(() => {
    if (getCitiesError) toast.error(getCitiesError.message);
  }, [getCitiesError]);

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
          name='cities'
          options={cities}
          label='States'
        />
        <ToggleButtonGroupRHF<FormValues>
          name='languages'
          options={languages}
          label='Languages'
        />
        <RadioGroupRHF<FormValues>
          name='gender'
          label='Gender'
          options={genders}
        />
        <CheckboxGroupRHF<FormValues>
          label='Skills'
          name='skills'
          options={skills}
        />
      </Stack>
    </form>
  );
}
