import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
	const urlPath = req.nextUrl.pathname;
	const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	if (!!session) {
		if (urlPath.startsWith('/auth/iniciar-sesion') || urlPath.startsWith('/auth/registro')) {
			return NextResponse.redirect(new URL('/', req.url));
		}
	} else {
		if (urlPath.startsWith('/usuario') || urlPath.startsWith('/carrito/')) {
			return NextResponse.redirect(new URL('/auth/iniciar-sesion', req.url));
		}
	}
}

export const config = {
	matcher: ['/', '/auth/:path*', '/usuario/:path*', '/carrito/:path*'],
};
