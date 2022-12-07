import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://dijbdshxvqpbceqsmtgf.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpamJkc2h4dnFwYmNlcXNtdGdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA0MjI5MjEsImV4cCI6MTk4NTk5ODkyMX0.mcb06cUBkn3LqkYHToV8GqcKgGkJjmEM5kthI3N3Neo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
