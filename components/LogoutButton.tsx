'use client';
import { handleSignOut } from '@/actions/userActions';
import React from 'react';
import { Button } from './ui/button';

export default function LogoutButton() {
	return (
		<Button
			onClick={() => handleSignOut()}
			className="bg-gray-500 text-white hover:bg-gray-400 active:bg-gray-600"
		>
			Sign-out
		</Button>
	);
}
