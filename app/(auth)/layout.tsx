export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main>
			<div className="h-[100vh] flex flex-col items-center justify-center">
				{children}
			</div>
		</main>
	);
}
