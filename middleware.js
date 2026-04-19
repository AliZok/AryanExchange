import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const supabaseUrl = 'https://vrbkcxugyiecbgmxkftg.supabase.co'
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyYmtjeHVneWllY2JnbXhrZnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNzkyMjAsImV4cCI6MjA5MTg1NTIyMH0.Z5R2BbK2VI1_GLkIL3WOKMoi2bx-vKqXqoWNVO_5kbM'
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  // Get auth token from header
  const authHeader = req.headers.get('authorization')
  
  // Protect admin routes
  if (req.nextUrl.pathname.startsWith('/admin/dashboard')) {
    if (!authHeader) {
      const redirectUrl = new URL('/admin', req.url)
      return NextResponse.redirect(redirectUrl)
    }

    try {
      // Get user from token
      const { data: { user }, error } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
      
      if (error || !user) {
        const redirectUrl = new URL('/admin', req.url)
        return NextResponse.redirect(redirectUrl)
      }

      // Check if user has admin role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (!profile || profile.role !== 'is_admin') {
        const redirectUrl = new URL('/admin', req.url)
        return NextResponse.redirect(redirectUrl)
      }
    } catch (error) {
      const redirectUrl = new URL('/admin', req.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*']
}
