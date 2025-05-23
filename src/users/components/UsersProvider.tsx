import { FormProvider, useForm } from 'react-hook-form';
import { schema, type Schema, defaultValues } from '../types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';

import Users from './Users';

export default function UsersProvider() {
  const methods = useForm<Schema>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues,
  });
  return (
    <>
      <FormProvider {...methods}>
        <Users />
        <DevTool control={methods.control} />
      </FormProvider>
    </>
  );
}
