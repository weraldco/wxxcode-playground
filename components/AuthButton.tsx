'use client';
import React, { ReactNode } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type AuthButtnProps = {
	loading: boolean;
	children: ReactNode;
};

const AuthButton: React.FC<AuthButtnProps> = ({ loading, children }) => {
	return (
		<button
			disabled={loading}
			type="submit"
			className="bg-teal-500 px-4 py-4 w-full rounded-full hover:bg-teal-400 hover:scale-105 active:bg-teal-300 duration-200 mt-2"
		>
			{loading ? (
				<div className="flex justify-center items-center">
					<AiOutlineLoading3Quarters
						size={30}
						className="animate-spin text-center"
					/>
					{/* <span className="animate-pulse text-center">Loading..</span> */}
				</div>
			) : (
				<p>{children}</p>
			)}
		</button>
	);
};

export default AuthButton;
