import bcrypt from 'bcryptjs';
import { NextAuthConfig, type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserById } from './actions/userActions';
import { signFormSchema } from './lib/auth-schema';
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

export default {
	callbacks: {
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			if (token.secretName && session.user) {
				session.user.secretName = token.secretName as string;
				session.user.youPicked = token.youPicked as string;
				session.user.firstWishlist = token.firstWishlist as string;
				session.user.secondWishlist = token.secondWishlist as string;
				session.user.thirdWishlist = token.thirdWishlist as string;
			}

			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;

			const user = await getUserById(token.sub as string);

			if (!user) return token;
			token.secretName = user.secretName;
			token.youPicked = user.youPicked;

			if (user.youPicked == null) return token;

			const userPicked = await prisma.user.findUnique({
				where: { secretName: user.youPicked },
			});

			token.firstWishlist = userPicked?.firstWishlist;
			token.secondWishlist = userPicked?.secondWishlist;
			token.thirdWishlist = userPicked?.thirdWishlist;

			return token;
		},
	},
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				secretName: {
					label: 'secreteName',
					type: 'text',
					placeholder: 'secret name',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Password',
				},
			},
			authorize: async (credentials) => {
				const secretName = credentials.secretName as string;
				const password = credentials.password as string;

				const parsedCredentials = signFormSchema.safeParse(credentials);

				if (!parsedCredentials.success) {
					console.error('Invalid credentials', parsedCredentials.error.errors);
					return null;
				}

				const user = await prisma.user.findUnique({ where: { secretName } });
				if (!user) {
					console.log('User not exist!');
					return null;
				}

				const isMatch = bcrypt.compare(password, user.hashedPassword as string);

				if (!isMatch) {
					console.log('Incorrect password!');
					return null;
				}
				return user;
			},
		}),
	],
	pages: {
		signIn: '/sign-in',
	},
} satisfies NextAuthConfig;
