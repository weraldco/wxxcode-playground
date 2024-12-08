// import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import './globals.css';

export const metadata: Metadata = {
	title: 'Palabunutan - AKATSUCHIX 2024',
	description: 'Craeted using NEXTJS',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SessionProvider>
			<html lang="en">
				<body className={`antialiased bg-[#18191A] text-white`}>
					{/* <Navbar /> */}
					{children}
				</body>
			</html>
		</SessionProvider>
	);
}
