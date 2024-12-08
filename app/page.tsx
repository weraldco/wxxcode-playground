import { Cherry_Bomb_One, Pixelify_Sans } from 'next/font/google';
import Link from 'next/link';
const cherry = Cherry_Bomb_One({ subsets: ['latin'], weight: '400' });
const noto = Pixelify_Sans({ weight: '400', subsets: ['latin'] });
export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center h-[60vh] gap-10 text-center">
			<div>
				<h1
					className={`text-[65px] md:text-[80px] ${cherry.className} text-pink-400`}
				>
					XMAS 2024
				</h1>
				<div
					className={`${noto.className} text-[16px] md:text-[20px] max-w-[600px]`}
				>
					You are invited this coming December 21-22, 2024. <br /> Come and join
					our Christmas Party. <br />
					The party starts at 6:30 PM.
				</div>
			</div>
			<div className="flex gap-x-4">
				<Link
					href="/sign-up"
					className="border-2 border-teal-500 px-6 py-4 rounded-full text-lg hover:scale-105 duration-200 hover:border-teal-400 active:scale-100 active:bg-teal-300"
				>
					Register
				</Link>
				<Link
					href="/sign-in"
					className="bg-teal-500 px-10 py-4 rounded-full text-lg hover:scale-105 duration-200 hover:bg-teal-400 active:scale-100 active:bg-teal-300"
				>
					Login
				</Link>
			</div>
		</div>
	);
}
