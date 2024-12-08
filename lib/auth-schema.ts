import { z } from 'zod';

export const formSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Fullname is required' })
		.max(50, { message: 'Name cannot exceed 50 characters.' }),
	secretName: z
		.string()
		.min(1, { message: 'Secret name is required.' })
		.max(50, { message: 'Name cannot exceed 50 characters.' }),
	password: z
		.string()
		.min(1, { message: 'Password is required.' })
		.max(50, { message: 'Password cannot exceed to 50 characters.' }),
	repeatPassword: z
		.string()
		.min(8, { message: 'Password is required.' })
		.max(50, { message: 'Password cannot exceed to 50 characters.' }),
	firstWishlist: z
		.string()
		.min(5, { message: 'First option for wishlist is required.' }),
	secondWishlist: z.string().optional(),
	thirdWishlist: z.string().optional(),
});

export const signFormSchema = formSchema.pick({
	secretName: true,
	password: true,
});
