export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main>
			<div className=" flex flex-col items-center justify-center">
				{children}
			</div>
		</main>
	);
}
