import { createClient } from "@supabase/supabase-js";

// Mengambil variabel dari .env, jika tidak ada (saat build di Vercel) berikan string palsu sebagai backup
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://ktpbpmowaveksdmijwhr.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummykeyplaceholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
