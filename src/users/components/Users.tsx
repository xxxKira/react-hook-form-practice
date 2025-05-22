import {
  useFieldArray,
  useFormContext,
  useWatch,
  type FieldValues,
} from 'react-hook-form';
import { defaultValues, type Schema } from '../types/schema';

import {
  useCities,
  useGenders,
  useLanguages,
  useSkills,
  useUsers,
} from '../services/queries';

import { Stack, Button, Container } from '@mui/material';
import AutocompleteRHF from '../../components/AutocompleteRHF';
import ToggleButtonGroupRHF from '../../components/ToggleButtonGroup';
import RadioGroupRHF from '../../components/RadioGroupRHF';
import CheckboxGroupRHF from '../../components/CheckboxGroupRHF';
import DateTimePickerRHF from '../../components/DateTimePickerRHF';
import DateRangePickerRHF from '../../components/DateRangePickerRHF';
import SliderRHF from '../../components/SliderRHF';
import SwitchRHF from '../../components/SwitchRHF';
import TextFieldRHF from '../../components/TextFieldRHF';
import { useEffect } from 'react';

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
  const { data: users } = useUsers();

  console.log(users);

  const { handleSubmit, control, unregister, reset } = useFormContext<Schema>();

  const isTeacher = useWatch({
    control,
    name: 'isTeacher',
  });

  const { append, fields, remove, replace } = useFieldArray<Schema>({
    control,
    name: 'students',
  });

  function handleReset() {
    reset(defaultValues);
  }

  // Form submission handler
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      unregister('students');
    }
  }, [isTeacher, replace, unregister]);

  return (
    <Container maxWidth='sm' component='form'>
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
          name='formerEmploymentPeriod'
          label={'Employment Period'}
        />
        <SliderRHF<Schema>
          name='salaryRange'
          label='Salary Range'
          min={0}
          max={3000}
        />
        <SwitchRHF<Schema> name='isTeacher' label='Are you a teacher?' />

        {isTeacher && (
          <Button
            variant='text'
            color='primary'
            type='button'
            onClick={() => append({ name: '' })}
          >
            Add Student
          </Button>
        )}
        {fields.map((field, index) => {
          return (
            <Stack key={field.id} sx={{ gap: 2 }}>
              <TextFieldRHF<Schema>
                label='Student Name'
                name={`students.${index}.name`}
              />
              <Button
                variant='text'
                color='error'
                type='button'
                onClick={() => remove(index)}
              >
                Remove Student
              </Button>
            </Stack>
          );
        })}
      </Stack>
      <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button type='submit'>New user</Button>
        <Button onClick={handleReset}>Reset</Button>
      </Stack>
    </Container>
  );
}
