
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("CRITICAL: Missing Supabase Environment Variables. Check your .env file or Vercel Project Settings.");
    throw new Error("Mesa: Missing Supabase credentials. See console for details.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
