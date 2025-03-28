
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://kkuoisrkawkqdubzftoh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrdW9pc3JrYXdrcWR1YnpmdG9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5OTEwNTEsImV4cCI6MjA1ODU2NzA1MX0.okLZt7ct0htI2ei99u--q6UMi4ykotXCl2cAKqyvkzw';

// H8RHQaA22gKSE4.

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
