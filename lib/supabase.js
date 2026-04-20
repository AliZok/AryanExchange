import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vrbkcxugyiecbgmxkftg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyYmtjeHVneWllY2JnbXhrZnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNzkyMjAsImV4cCI6MjA5MTg1NTIyMH0.Z5R2BbK2VI1_GLkIL3WOKMoi2bx-vKqXqoWNVO_5kbM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
