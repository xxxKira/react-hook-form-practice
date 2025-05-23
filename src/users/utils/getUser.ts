import { supabase } from '../../supabase/supabase';
// import type { ApiGet } from '../../types/apiTypes';
import type { Schema } from '../types/schema';

export async function getUser(id: number): Promise<Schema> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`There was problem with fetching user.`);
  }

  const user = {
    ...data,
    formerEmploymentPeriod: [
      new Date(data.formerEmploymentPeriod[0]),
      new Date(data.formerEmploymentPeriod[1]),
    ],
    variant: 'edit',
    id: data?.id,
    gender: data?.gender + '',
    registrationDateAndTime: new Date(data.registrationDateAndTime),
  };

  return user;
}
