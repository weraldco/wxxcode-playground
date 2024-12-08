import React from 'react';
import LogoutButton from './LogoutButton';

export default function Navbar({ session }: { session: any }) {
	return (
		<div className=" px-4">
			<div className="flex items-center justify-end mx-auto max-w-4xl h-14 ">
				{session && <LogoutButton />}
			</div>
		</div>
	);
}
