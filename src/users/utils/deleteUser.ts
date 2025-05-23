import { supabase } from '../../supabase/supabase';

export async function deleteUser(id: number) {
  const { error } = await supabase.from('users').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
}
