import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { AuthApiError } from '@supabase/supabase-js';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { loginSchema } from '$lib/models/formData';

export const load: PageServerLoad = async (event) => {
	const {
		url,
		locals: { getSession, supabase }
	} = event;

	const session = await getSession();

	// if the user is already logged in return them to the account page
	if (session) {
		const redirectTo = url.searchParams.get('redirectTo');
		const { data } = await supabase
			.from('profiles')
			.select('username')
			.eq('id', session.user.id)
			.single();
		if (redirectTo) {
			throw redirect(303, `/${redirectTo.slice(1)}`);
		}
		throw redirect(303, `/${data?.username}`);
	}

	const form = await superValidate(event, loginSchema);
	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, loginSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { locals, url } = event;
		const { data: { user }, error: err } = await locals.supabase.auth.signInWithPassword({
			email: form.data.email,
			password: form.data.password
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				setError(form, 'email', 'Invalid Credentials');
				return setError(form, 'password', 'Invalid Credentials');
			}

			return fail(500, {
				message: 'Server error. Try again later.'
			});
		} else {
			const { data } = await locals.supabase
				.from('profiles')
				.select('username')
				.eq('id', user?.id)
				.single();
			const redirectTo = url.searchParams.get('redirectTo');
			if (redirectTo) {
				throw redirect(303, `/${redirectTo.slice(1)}`);
			}
			throw redirect(303, `/${data?.username}`);
		}
	}
};
