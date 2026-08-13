import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fqoiaoeoonutxbwjmkyz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxb2lhb2Vvb251dHhid2pta3l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1NTE0ODgsImV4cCI6MjEwMjEyNzQ4OH0.MQVLlqIi3anlXb7aIfYD_OOYoHGaLPdzXjueTMNZiKk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
