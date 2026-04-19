import { NextResponse } from 'next/server'

export function middleware() {
  // Authentication is handled client-side in dashboard component
  // This middleware just passes through all requests
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*']
}
