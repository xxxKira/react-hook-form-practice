import { supabase } from '../../supabase/supabase';
import type { Schema } from '../types/schema';

export async function createUser(data: Schema) {
  const { data: user, error } = await supabase
    .from('users')
    .insert(data)
    .select();

  if (error) {
    throw new Error(`There was problem with creating user.`);
  }

  return { user };
}
