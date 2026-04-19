import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
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
