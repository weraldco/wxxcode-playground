import { getAllTheUser } from '@/actions/userActions';
import React from 'react';

export default async function RegisteredPage() {
	const users = await getAllTheUser();
	return (
		<div className=" flex flex-col justify-center items-center h-[60vh] gap-4">
			<h1 className="text-2xl font-bold">Registered Guest</h1>

			<div className="flex gap-2">
				<div className="flex">
					<span className="bg-teal-700 px-3 flex items-center text-sm"></span>
					<span className=" px-4 flex items-center text-xs">not yet pick</span>
				</div>
				<div className="flex">
					<span className="bg-red-500 px-3 py-3 flex items-center text-sm"></span>
					<span className=" px-4 flex items-center text-xs">picked</span>
				</div>
			</div>
			{users && (
				<ul className="flex flex-col gap-2">
					{users.map((user, i) => (
						<li key={i} className="group flex flex-row gap-2 ">
							<span
								className={`${
									user.youPicked == null ? `bg-teal-700` : 'bg-red-500'
								} text-gray-300 font-bold px-4 py-2 group-hover:bg-teal-600  duration-200`}
							>
								{i + 1}
							</span>
							<span className="flex bg-gray-200 text-gray-900 px-2 items-center justify-center  w-full group-hover:bg-gray-50  duration-200">
								<span className="w-full">{user.name}</span>
							</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
