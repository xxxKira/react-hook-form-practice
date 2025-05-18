import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseUrl = 'https://agqlesadcqhfsiizcecl.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
// const supabaseKey =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFncWxlc2FkY3FoZnNpaXpjZWNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMzE2ODAsImV4cCI6MjA2MjkwNzY4MH0.-v_7GK0HOAmvfUNl2DrFwalki67jUdDUBzIWHl4w0vM';

export const supabase = createClient(supabaseUrl, supabaseKey);
