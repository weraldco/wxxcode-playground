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

import {
	checkLoginDetails,
	handleCredentialsSignIn,
} from '@/actions/userActions';
import AuthButton from '@/components/AuthButton';
import { signFormSchema } from '@/lib/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormFieldElement } from './FormFieldElement';

export default function SignInForm() {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof signFormSchema>>({
		resolver: zodResolver(signFormSchema),
		defaultValues: {
			secretName: '',
			password: '',
		},
	});

	async function onSubmit(values: z.infer<typeof signFormSchema>) {
		try {
			setLoading(true);
			const check = await checkLoginDetails(values.secretName, values.password);
			if (check !== null) {
				setLoading(false);
				setError(check as string);
				setLoading(false);
			} else {
				const result = await handleCredentialsSignIn(values);
				console.log(result.message);
				setLoading(false);
			}
		} catch (error) {
			console.log('An unexpected error occurred. Please try again.', error);
		}
	}

	return (
		<Card className="w-full max-w-md mx-auto bg-[#18191A] border-0 text-white">
			<CardHeader>
				<CardTitle>Sign In</CardTitle>
				<CardDescription>
					Welcome back! Please sign in to continue
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormFieldElement
							formControl={form.control}
							name="secretName"
							label="Secret name"
							placeHolder="Enter your secret name.."
							type="text"
						/>
						<FormFieldElement
							formControl={form.control}
							name="password"
							label="Password"
							placeHolder="Enter your password.."
							type="password"
						/>

						{error && (
							<FormDescription className="text-red-400">
								{error}
							</FormDescription>
						)}
						<AuthButton loading={loading}>Login</AuthButton>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex justify-center">
				<p className="text-sm text-muted-foreground">
					Don&apos;t have an account yet?{' '}
					<Link href="/sign-up" className="text-white hover:underline">
						Sign-up
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
}
