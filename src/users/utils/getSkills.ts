import { supabase } from '../../supabase/supabase';

export async function getSkills() {
  const { data: skills, error } = await supabase.from('skills').select('*');

  if (error) {
    throw new Error(`There was problem with fetching skills.`);
  }

  return skills;
}
