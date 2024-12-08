'use server';

import { auth, signIn, signOut } from '@/auth';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type UserTypes = {
	name: string;
	secretName: string;
	password: string;
	repeatPassword: string;
	firstWishlist: string;
	secondWishlist?: string | undefined;
	thirdWishlist?: string | undefined;
};

export const getUserById = async (id: string) => {
	try {
		const user = await prisma.user.findUnique({ where: { id } });
		return user;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getUserBySecretName = async (secretName: string) => {
	const user = await prisma.user.findUnique({ where: { secretName } });
	try {
		if (!user) {
			return null;
		}
		return user;
	} catch (error) {
		console.error(error);
	}
};

export const checkLoginDetails = async (
	secretName: string,
	password: string
) => {
	try {
		const user = await prisma.user.findUnique({ where: { secretName } });
		if (!user) {
			return 'User not existing';
		} else {
			const isMatch = await bcrypt.compare(
				password,
				user.hashedPassword as string
			);

			if (isMatch) {
				return null;
			} else {
				return 'Incorrect password!';
			}
		}
	} catch (error) {
		console.error(error);
	}
};

export const registerUser = async (values: UserTypes) => {
	const {
		name,
		secretName,
		password,
		repeatPassword,
		firstWishlist,
		secondWishlist,
		thirdWishlist,
	} = values;

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		await prisma.user.create({
			data: {
				name,
				secretName,
				hashedPassword,
				firstWishlist,
				secondWishlist,
				thirdWishlist,
			},
		});
	} catch (error) {
		console.log(error);
	} finally {
		revalidatePath('/sign-up');
		redirect('/sign-in');
	}
};

export const handleCredentialsSignIn = async ({
	secretName,
	password,
}: {
	secretName: string;
	password: string;
}) => {
	try {
		await signIn('credentials', { secretName, password, redirectTo: '/' });
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return {
						message: 'Invalid credentials',
					};
				default:
					return {
						messsage: 'Something went wrong',
					};
			}
		}

		throw error;
	} finally {
		revalidatePath('/sign-in');
		redirect('/dashboard');
	}
};

export const handleSignOut = async () => {
	await signOut();
};

export const pickMonitoMonita = async () => {
	const session = await auth();
	try {
		if (session?.user?.secretName) {
			const allUsers = await prisma.user.findMany({
				where: {
					OR: [
						{
							picked: false,
						},
					],
					NOT: {
						secretName: session.user.secretName,
					},
				},
				select: {
					id: true,
					secretName: true,
					picked: true,
					youPicked: true,
				},
			});

			const userPool = allUsers.filter(
				(user) => user.youPicked != session.user?.secretName
			);
			console.log('USERPOOL FILTERED', userPool);
			const randomNum = Math.floor(Math.random() * userPool.length);
			const userPicked = userPool[randomNum]; // random pick from the fetch data in db

			await prisma.user.update({
				where: {
					secretName: session?.user?.secretName,
				},
				data: {
					youPicked: userPicked.secretName,
				},
			});
			await prisma.user.update({
				where: {
					id: userPicked.id,
				},
				data: {
					picked: true,
				},
			});
		}
	} catch (error) {
		console.log(error);
	} finally {
		revalidatePath('/dashboard');
	}
};

export const getAllTheUser = async () => {
	try {
		const users = await prisma.user.findMany({
			select: { name: true, youPicked: true },
		});
		return users;
	} catch (error) {
		console.log('error fetching data');
	} finally {
		revalidatePath('/registered');
	}
};
