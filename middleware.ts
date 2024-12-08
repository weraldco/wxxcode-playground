import { auth } from '@/auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard'];

const loggedInRoutes = ['/sign-in', '/sign-up', '/'];

export default async function middleware(request: NextRequest) {
	const session = await auth();
	const pathname = request.nextUrl.pathname;
	const isProtected = protectedRoutes.some((route) =>
		request.nextUrl.pathname.startsWith(route)
	);

	const isLogged = loggedInRoutes.some((route) =>
		request.nextUrl.pathname.startsWith(route)
	);

	if (!session && isProtected) {
		const absoluteURL = new URL('/', request.nextUrl.origin);
		return NextResponse.redirect(absoluteURL.toString());
	}

	if (
		session &&
		(pathname === '/sign-in' || pathname == '/sign-up' || pathname == '/')
	) {
		console.log(isLogged);
		// const absoluteURL = new URL('/', request.nextUrl.origin);
		return NextResponse.redirect(new URL('/dashboard', request.nextUrl.origin));
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
