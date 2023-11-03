import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getSession } from './app/api/auth/[...nextauth]/utils'
import { getToken } from 'next-auth/jwt'

//export { default } from 'next-auth/middleware'
export async function middleware(request: NextRequest) {
  const token = await getToken({req: request})

  if(!token){
    return NextResponse.json({errorMessage: 'unauthorized, please login'}, {status: 403})
  }
}
export const config = {
  matcher: [
    '/api/user/:path*',
    '/api/resume/:path*'
  ]
}