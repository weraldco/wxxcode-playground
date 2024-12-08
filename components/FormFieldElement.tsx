/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type FormFieldElementProps = {
	formControl: any;
	name: string;
	label: string;
	placeHolder: string;
	type: string;
};

export function FormFieldElement({
	formControl,
	name,
	label,
	placeHolder,
	type,
}: FormFieldElementProps) {
	return (
		<FormField
			control={formControl}
			name={name}
			render={({ field }) => (
				<FormItem className="">
					<FormLabel className="text-base text-gray-400">{label}</FormLabel>
					<FormControl>
						<Input
							className="rounded-full text-gray-800 text-base md:text-lg"
							placeholder={placeHolder}
							type={type}
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
