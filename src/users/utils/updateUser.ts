import { supabase } from '../../supabase/supabase';
import type { Common } from '../../types/apiTypes';

export async function updateUser(data: Common, id: number) {
  const { data: updatedUser, error } = await supabase
    .from('users')
    .update({ ...data })
    .eq('id', id)
    .select();

  if (error) {
    console.error(error.message);
    throw new Error('There is an error update user');
  }

  return { updatedUser };
}
