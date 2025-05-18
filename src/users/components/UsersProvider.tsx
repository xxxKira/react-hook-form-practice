import { FormProvider, useForm } from 'react-hook-form';
import { schema, type FormValues, defaultValues } from '../types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';

import Users from './Users';

export default function UsersProvider() {
  const methods = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues,
  });
  return (
    <div className='w-[60%] py-12'>
      <FormProvider {...methods}>
        <Users />
        <DevTool control={methods.control} />
      </FormProvider>
    </div>
  );
}
