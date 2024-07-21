import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from './actions/get-cookie';

export default async function middleware(request: NextRequest) {
  const payloadFound = await getCookie('payload');

  const homeUrl = new URL('/', request.url);
  const sigInUrl = new URL('/login', request.url);

  if (!payloadFound) {
    if (request.nextUrl.pathname === '/login') return NextResponse.next();
    if (request.nextUrl.pathname === '/object') {
      if (request.nextUrl.searchParams.get('idObject'))
        return NextResponse.next();
    }
    return NextResponse.redirect(sigInUrl);
  }

  if (request.nextUrl.pathname === '/login')
    return NextResponse.redirect(homeUrl);

  const payload = JSON.parse(payloadFound.value);

  if (payload.type === 'ALUNO') {
    if (request.nextUrl.pathname === '/edit-category')
      return NextResponse.redirect(homeUrl);

    if (request.nextUrl.pathname === '/register-user')
      return NextResponse.redirect(homeUrl);

    if (request.nextUrl.pathname === '/') return NextResponse.redirect(homeUrl);
  }
}

export const config = {
  matcher: ['/', '/login', '/profile', '/object/(.*)', '/register-user'],
};
