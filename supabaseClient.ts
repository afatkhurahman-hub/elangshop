import { createClient } from "@supabase/supabase-js";

// Menggunakan URL dan Anon Key asli agar fitur login & database berjalan lancar di Vercel
const supabaseUrl = "https://ktpbpmowaveksdmijwhr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0cGJwbW93YXZla3NkbWlqd2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MzY2MDksImV4cCI6MjA5NTMxMjYwOX0.Pbyg0110MqSaBDps18aaaxip6TjsczolJi5zF2FutFA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
