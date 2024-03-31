
import { NextResponse , NextRequest , userAgent } from 'next/server'

// middleware handle authentication and authorization
export function middleware(request: NextRequest) {
  const protectedUrl = [ '/user']
  const cookie =  request.cookies.has('access_token')
  const pathName = request?.nextUrl?.pathname

   
    if(!cookie && protectedUrl.includes(pathName)) {
      return NextResponse.redirect(new URL('/', request.url))
    }

}






// export const config = {
//   matcher: "/((?!api|static|.*\\..*|_next).*)",
// };

export const config = {
  matcher: '/user',
}