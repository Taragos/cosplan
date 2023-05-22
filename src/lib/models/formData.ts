import { z } from 'zod';

export const loginSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.trim()
		.nonempty('Enter your email first')
		.email({ message: 'Email must be a valid email address' }),
	password: z
		.string({ required_error: 'Password is required' })
		.nonempty('Enter your password to sign up')
		.min(8, 'Your password should contain at least 8 characters')
});

export const signUpSchema = z.object({
	username: z
		.string({ required_error: 'Username is required' })
		.trim()
		.nonempty('Enter your username first'),
	email: z
		.string({ required_error: 'Email is required' })
		.trim()
		.nonempty('Enter your email first')
		.email({ message: 'Email must be a valid email address' }),
	password: z
		.string({ required_error: 'Password is required' })
		.nonempty('Enter your password to sign up')
		.min(8, 'Your password should contain at least 8 characters')
});

export const createProjectSchema = z.object({
	title: z.string({ required_error: "Title is required "}).trim().nonempty('Enter a title'),
	character: z.string({ required_error: "Character is required "}).trim().nonempty('Enter a character'),
	origin: z.string({ required_error: "Origin is required "}).trim().nonempty('Enter an Origin for the character'),
	current_stage: z.enum(["Planned", "In Progress", "Finished", "Archived"], { required_error: "The current stage is required"}).default("Planned"),
	current_visibility: z.enum(["Public", "Hide"], { required_error: "The current visibility is required"}).default("Public"),
	image: z.any(),
	prerequisites: z.object({
		text: z.string({ required_error: "Add some text to describe the prerequisite"}).trim().nonempty('Add some text to describe the prerequisite'),
		icon: z.string(),
		done: z.boolean(),
	}).array()
})