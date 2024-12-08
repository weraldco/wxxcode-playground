import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { type DefaultSession } from 'next-auth';
import authConfig from './auth.config';
import prisma from './lib/prisma';

export type ExtendedUser = DefaultSession['user'] & {
	secretName: string;
	youPicked: string;
	firstWishlist: string;
	secondWishlist: string;
	thirdWishlist: string;
};

declare module 'next-auth' {
	interface Session {
		user: ExtendedUser;
	}
}

export const {
	handlers: { GET, POST },
	signIn,
	signOut,
	auth,
} = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	...authConfig,
});
