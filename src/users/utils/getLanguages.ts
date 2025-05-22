import { supabase } from '../../supabase/supabase';

export async function getLanguages() {
  const { data: languages, error } = await supabase
    .from('languages')
    .select('*');

  if (error) {
    throw new Error(`There was problem with fetching languages.`);
  }

  return languages;
}
