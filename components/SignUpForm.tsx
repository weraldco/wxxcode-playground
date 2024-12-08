'use client';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { Form, FormDescription } from '@/components/ui/form';

import Link from 'next/link';
import React, { useState } from 'react';

import { getUserBySecretName, registerUser } from '@/actions/userActions';
import AuthButton from '@/components/AuthButton';
import { formSchema } from '@/lib/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormFieldElement } from './FormFieldElement';

export default function SignUpForm() {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			secretName: '',
			password: '',
			repeatPassword: '',
			firstWishlist: '',
			secondWishlist: '',
			thirdWishlist: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		if (!(await getUserBySecretName(values.secretName))) {
			if (values.password === values.repeatPassword) {
				registerUser(values);
				setLoading(false);
			} else {
				setLoading(false);
				setError("Password didn't match!");
			}
		} else {
			setLoading(false);
			setError('Secret name is already in registered!');
		}
	}

	return (
		<Card className="w-full max-w-md mx-auto mt-36 md:mt-0 bg-[#18191A] border-0 text-white">
			<CardHeader>
				<CardTitle>Sign Up</CardTitle>
				<CardDescription>
					Create your account to join this event.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormFieldElement
							formControl={form.control}
							name="name"
							label="Fullname "
							placeHolder="Enter your full name.."
							type="text"
						/>

						<FormFieldElement
							formControl={form.control}
							name="secretName"
							label="Secret name"
							placeHolder="eg. Zorro (This is your username to login.)"
							type="text"
						/>

						<FormFieldElement
							formControl={form.control}
							name="password"
							label="Password"
							placeHolder="Enter your password"
							type="password"
						/>

						<FormFieldElement
							formControl={form.control}
							name="repeatPassword"
							label="Repeat Password"
							placeHolder="Enter your repeat password"
							type="password"
						/>

						<FormDescription className="text-base text-gray-400">
							Your wishlist{' '}
							<span className="text-sm text-gray-500">
								(You can provide 3 wishlist options for the gift exchange, so
								the person picking you as their Secret Santa has better
								choices.)
							</span>
						</FormDescription>

						<FormFieldElement
							formControl={form.control}
							name="firstWishlist"
							label=""
							placeHolder="Enter your first option wishlist.."
							type="text"
						/>

						<FormFieldElement
							formControl={form.control}
							name="secondWishlist"
							label=""
							placeHolder="Enter your second option wishlist.."
							type="text"
						/>

						<FormFieldElement
							formControl={form.control}
							name="thirdWishlist"
							label=""
							placeHolder="Enter your third option wishlist.."
							type="text"
						/>

						{error && (
							<FormDescription className="text-red-500 text-sm">
								{error}
							</FormDescription>
						)}

						<AuthButton loading={loading}>Submit</AuthButton>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex justify-center">
				<p className="text-sm text-muted-foreground">
					Already have an account?{' '}
					<Link href="/sign-in" className="text-white hover:underline">
						Sign-in
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
}
