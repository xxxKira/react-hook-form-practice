import { supabase } from '../../supabase/supabase';

export async function getGenders() {
  const { data: genders, error } = await supabase.from('genders').select('*');

  if (error) {
    throw new Error(`There was problem with fetching genders.`);
  }

  return genders;
}
