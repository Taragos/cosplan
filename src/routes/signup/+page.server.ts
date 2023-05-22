import { setError, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { signUpSchema } from '$lib/models/formData';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const form = await superValidate(event, signUpSchema);
	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const { locals } = event;
		const form = await superValidate(event, signUpSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { data: existing, error: test } = await locals.supabase
			.from('profiles')
			.select('username')
			.single();

		if (existing) {
			return setError(form, "username", "This username is already in use.")
		}

		const {data, error} = await locals.supabase.auth.signUp({
			email: form.data.email,
			password: form.data.password
		});

		if (error) {
			return setError(form, 'email', 'An Account with this E-Mail already exists');
		}

		const profileResult = await locals.supabase.from('profiles').insert({
			id: data.user?.id,
			username: form.data.username
		});

		if (profileResult.error) {
			if (profileResult.error.code == "23505") {
				return setError(form, 'username', "An Account with that username already exists")
			}
			return setError(form, 'username', "An error has occured")
		}

		throw redirect(303, '/login');
	}
};
