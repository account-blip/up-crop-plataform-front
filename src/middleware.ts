import { auth } from './auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server' // 👈 importa el tipo

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicApiRoutes,
  publicRoutes,
} from './routes'

export default auth((req: NextRequest & { auth?: any }) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicApiRoute = publicApiRoutes.includes(nextUrl.pathname as never)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname as never)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname as never)

  if (isApiAuthRoute || isPublicApiRoute) {
    return
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/auth/login', nextUrl))
  }

  return
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
