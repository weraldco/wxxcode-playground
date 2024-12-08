'use client';
import { pickMonitoMonita } from '@/actions/userActions';
import React from 'react';
import { Button } from './ui/button';

export default function PickButton() {
	return (
		<div>
			<form action={pickMonitoMonita}>
				<Button
					type="submit"
					className="bg-teal-500 text-white text-xl px-8 py-8 rounded-full hover:bg-teal-400 duration-200 active:bg-teal-600"
				>
					Pick Monito/Monita
				</Button>
			</form>
			{/* --------------- */}
			{/* <button
				disabled
				className="bg-gray-500 text-white  text-xl px-8 py-6 rounded-full opacity-50"
			>
				Pick Monito/Monita
			</button> */}
		</div>
	);
}
