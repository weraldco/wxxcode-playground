// import { getPickedResult } from '@/action/auth';
import { auth } from '@/auth';
import Navbar from '@/components/Navbar';
// import PickButton from '@/components/PickButton';
import { redirect } from 'next/navigation';
import React from 'react';

import PickButton from '@/components/PickButton';
import { Pixelify_Sans } from 'next/font/google';
const noto = Pixelify_Sans({ weight: '400', subsets: ['latin'] });

export default async function DashboardPage() {
	const session = await auth();
	if (!session?.user) {
		redirect('/');
	}
	return (
		<div>
			<Navbar session={session} />

			<div className="flex flex-col items-center justify-center h-[60vh] text-center gap-4">
				<div className="flex flex-col justify-center items-center gap-4">
					<span className={`text-4xl md:text-5xl ${noto.className}`}>
						Welcome aboard,
						<br /> <span className="text-pink-500">{session.user.name}</span>
					</span>
				</div>
				<div className="flex justify-center items-center">
					{session.user.youPicked == null ? (
						<div className="flex flex-col gap-10">
							<div className={`w-[350px] md:w-[500px] italic`}>
								Thank you for joining this event! The button below will be used
								to draw your Monito/Monita for the Christmas Party. It is
								currently disabled, and it will be active once all guests have
								registered. We will announce when the button is ready to use.
							</div>
							<PickButton />
						</div>
					) : (
						<div className="text-sm md:text-base italic w-[300px] md:w-[400px] flex flex-col gap-2">
							<span>Your Secret Santa is</span>
							<div className="bg-teal-500 p-10 rounded-xl flex flex-col gap-10">
								<span className=" font-bold text-5xl text-pink-300 ">
									{session.user.youPicked.toUpperCase()}
								</span>
							</div>
							<div className="flex flex-col text-left gap-3">
								<h1 className="text-base">WISHLIST</h1>
								<span className="text-gray-500">
									(Select any item from the wishlist below, you only need one
									gift for your Secret Santa.)
								</span>
								<div className="gap-4 flex flex-col">
									<div className="flex gap-2  items-center bg-gray-500 p-2 rounded-xl ">
										<span className="bg-teal-500 px-4 py-2 rounded-full">
											1
										</span>
										{session.user.firstWishlist}
									</div>
									{session.user.secondWishlist ? (
										<div className="flex gap-2  items-center bg-gray-500 p-2 rounded-xl ">
											<span className="bg-teal-500 px-4 py-2 rounded-full">
												2
											</span>
											{session.user.secondWishlist}
										</div>
									) : session.user.thirdWishlist ? (
										<div className="flex gap-2  items-center bg-gray-500 p-2 rounded-xl ">
											<span className="bg-teal-500 px-4 py-2 rounded-full">
												3
											</span>
											{session.user.thirdWishlist}
										</div>
									) : null}
								</div>
							</div>
							<span>
								Thank you for participating in our Secret Santa gift exchange!
								See you in the event..
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
