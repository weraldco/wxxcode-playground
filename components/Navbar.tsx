import { auth } from '@/auth';
import React from 'react';
import LogoutButton from './LogoutButton';

export default async function Navbar() {
	const session = await auth();
	return (
		<div className=" px-4">
			<div className="flex items-center justify-end mx-auto max-w-4xl h-14 ">
				{session && <LogoutButton />}
			</div>
		</div>
	);
}
