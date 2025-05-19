import { useFormContext, type FieldValues } from 'react-hook-form';
import { type Schema } from '../types/schema';

import {
  useCities,
  useGenders,
  useLanguages,
  useSkills,
} from '../services/queries';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

import { Stack } from '@mui/material';
import AutocompleteRHF from '../../components/AutocompleteRHF';
import ToggleButtonGroupRHF from '../../components/ToggleButtonGroup';
import RadioGroupRHF from '../../components/RadioGroupRHF';
import CheckboxGroupRHF from '../../components/CheckboxGroupRHF';
import DateTimePickerRHF from '../../components/DateTimePickerRHF';
import DateRangePickerRHF from '../../components/DateRangePickerRHF';
import SliderRHF from '../../components/SliderRHF';
import SwitchRHF from '../../components/SwitchRHF';
import TextFieldRHF from '../../components/TextFieldRHF';

export default function Users() {
  const {
    data: cities,
    error: getCitiesError,
    isPending: isCitiesLoading,
  } = useCities();
  const {
    data: languages,
    error: getLanguagesError,
    isPending: isLanguagesLoading,
  } = useLanguages();
  const {
    data: genders,
    error: getGendersError,
    isPending: isGendersLoading,
  } = useGenders();
  const {
    data: skills,
    error: getSkillsError,
    isPending: isSkillsLoading,
  } = useSkills();

  const { handleSubmit } = useFormContext<Schema>();

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
        <TextFieldRHF<Schema> label='Name' name='name' />
        <TextFieldRHF<Schema> label='Email' name='email' />
        <AutocompleteRHF<Schema>
          name='cities'
          options={cities}
          label='Cities'
          disabled={isCitiesLoading}
        />
        <ToggleButtonGroupRHF<Schema>
          name='languages'
          options={languages}
          label='Languages'
          disabled={isLanguagesLoading}
        />
        <RadioGroupRHF<Schema>
          name='gender'
          label='Gender'
          options={genders}
          aria-disabled={isGendersLoading}
        />
        <CheckboxGroupRHF<Schema>
          label='Skills'
          name='skills'
          options={skills}
          aria-disabled={isSkillsLoading}
        />
        <DateTimePickerRHF<Schema>
          name='registrationDateAndTime'
          label='Date'
        />
        <DateRangePickerRHF<Schema>
          name='employmentPeriod'
          label={'Employment Period'}
        />
        <SliderRHF<Schema>
          name='salaryRange'
          label='Salary Range'
          min={0}
          max={3000}
        />
        <SwitchRHF<Schema> name='isTeacher' label='Are you a teacher?' />
      </Stack>
    </form>
  );
}
