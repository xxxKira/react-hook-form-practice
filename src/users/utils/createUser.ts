import { supabase } from '../../supabase/supabase';
import type { Common } from '../../types/apiTypes';

export async function createUser(data: Common) {
  const { data: user, error } = await supabase.from('users').insert(data);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return { user };
}
