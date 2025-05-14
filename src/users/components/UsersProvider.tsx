import { FormProvider, useForm } from 'react-hook-form';
import { schema, type FormValues } from '../types/schema';
import { zodResolver } from '@hookform/resolvers/zod';

import Users from './Users';

export default function UsersProvider() {
  const methods = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Users />
    </FormProvider>
  );
}
