import {
  useFieldArray,
  useFormContext,
  useWatch,
  type SubmitHandler,
} from 'react-hook-form';
import { defaultValues, type Schema } from '../types/schema';

import {
  useCities,
  useGenders,
  useLanguages,
  useSkills,
  useUser,
  useUsers,
} from '../services/queries';

import {
  Stack,
  Button,
  Container,
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
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
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
} from '../services/mutations';

export default function Users() {
  const {
    data: cities,
    // error: getCitiesError,
    isPending: isCitiesLoading,
  } = useCities();
  const {
    data: languages,
    // error: getLanguagesError,
    isPending: isLanguagesLoading,
  } = useLanguages();
  const {
    data: genders,
    // error: getGendersError,
    isPending: isGendersLoading,
  } = useGenders();
  const {
    data: skills,
    // error: getSkillsError,
    isPending: isSkillsLoading,
  } = useSkills();

  const {
    data: users,
    isLoading: isLoadingUsers,
    error: getUsersError,
  } = useUsers();

  const { handleSubmit, control, unregister, reset, setValue } =
    useFormContext<Schema>();

  const isTeacher = useWatch({
    control,
    name: 'isTeacher',
  });

  const id = useWatch({
    control,
    name: 'id',
  });

  const { data: user, isLoading: isLoadingUser } = useUser(id);
  const { mutate: createUser } = useCreateUser();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUser();

  const isWorking =
    isLanguagesLoading ||
    isCitiesLoading ||
    isGendersLoading ||
    isLoadingUser ||
    isSkillsLoading;

  const { append, fields, remove, replace } = useFieldArray<Schema>({
    control,
    name: 'students',
  });

  function handleReset() {
    if (id && user) {
      reset({ ...defaultValues, id, variant: 'edit' });
    } else {
      reset(defaultValues);
    }
  }

  // Form submission handler
  const onSubmit: SubmitHandler<Schema> = (data) => {
    const { variant, ...otherData } = data;

    if (variant === 'create') {
      createUser(otherData, {
        onSuccess: () => {
          reset(defaultValues);
        },
      });
    } else if (variant === 'edit' && 'id' in otherData) {
      const { id, ...rest } = otherData;
      updateUser(
        { data: rest, id },
        {
          onSuccess: () => {
            reset(defaultValues);
          },
        }
      );
    }
  };

  function handleUserClick(id: number) {
    setValue('id', id);
  }

  function handleDeleteUser(id: number) {
    deleteUser(id);
    reset(defaultValues);
  }

  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      unregister('students');
    }
  }, [isTeacher, replace, unregister]);

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  return (
    <Container
      maxWidth='sm'
      component='form'
      sx={{ width: '100%' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack sx={{ gap: 2, flexDirection: 'row' }}>
        <List
          subheader={<ListSubheader>Users</ListSubheader>}
          sx={{ flex: 4, overflow: 'auto' }}
        >
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => reset(defaultValues)}
              selected={!id && !user}
            >
              <ListItemText primary='New user' />
            </ListItemButton>
          </ListItem>
          {isLoadingUsers && <div className='loader'></div>}
          {(!isLoadingUsers || !getUsersError) &&
            users?.map((user) => (
              <ListItem disablePadding key={user.id}>
                <ListItemButton
                  onClick={() => handleUserClick(user.id)}
                  selected={id === user.id}
                >
                  <ListItemText primary={user.name} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>

        <Stack
          sx={{
            gap: 2,
            flex: 12,
          }}
        >
          {isWorking && <div className='loader'></div>}
          {!isWorking && (
            <>
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
              <Stack
                sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <Button type='submit'>
                  {id && user ? 'Edit user' : 'Create user'}
                </Button>
                <Button onClick={handleReset}>Reset</Button>
              </Stack>
              {user && id && (
                <Button
                  variant='text'
                  color='error'
                  onClick={() => handleDeleteUser(id)}
                >
                  Delete User
                </Button>
              )}
            </>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
