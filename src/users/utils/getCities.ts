import { supabase } from '../../supabase/supabase';

export async function getCities() {
  const { data: cities, error } = await supabase.from('cities').select('*');

  if (error) {
    throw new Error(`There was problem with fetching cities.`);
  }

  return cities;
}
