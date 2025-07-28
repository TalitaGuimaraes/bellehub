import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: any;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variáveis de ambiente do Supabase não encontradas!');
  console.error('Certifique-se de que NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY estão definidas no arquivo .env.local');
  
  // Create a mock client to prevent the app from crashing during development
  console.warn('⚠️ Using mock Supabase client. Please add your credentials to .env.local');
  supabase = {
    auth: {
      signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }) }),
      insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
    })
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

// Tipos para as tabelas do banco
export interface Usuario {
  id: string;
  email: string;
  name: string;
  phone?: string;
  business_name?: string;
  business_type?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}