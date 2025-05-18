import { supabase } from '../../supabase/supabase';

export async function getUsers() {
  const { data: users, error } = await supabase.from('users').select('*');

  if (error) {
    throw new Error(`There was problem with fetching users.`);
  }

  return users;
}
