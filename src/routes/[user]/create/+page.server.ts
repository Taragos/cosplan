import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { createProjectSchema } from '$lib/models/formData';
import { AuthApiError } from '@supabase/supabase-js';
import { uploadFile } from '$lib/utils/storage';

export const load: PageServerLoad = async (event) => {
	const {
		params: { user },
		locals: { getSession }
	} = event;

	const session = await getSession();

	// if the user is already logged in return them to the account page
	if (!session) {
		throw redirect(303, `/${user}`);
	}

	const form = await superValidate(event, createProjectSchema);
	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const { request } = event;

		const formData = await request.formData();
		const form = await superValidate(formData, createProjectSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const {
			locals,
			params: { user }
		} = event;
		const { getSession, supabase } = locals;

		const session = await getSession();

		if (!session) {
			throw redirect(302, `/${user}`);
		}

		const file = formData.get('image');

		const fileData = await uploadFile(file, supabase)

		const { data, error: err } = await supabase.from('cosplay_projects').insert({
			...form.data,
			profile: session?.user.id,
			image: fileData?.path
		});

		if (err) {
			return fail(500, {
				message: 'Server error. Try again later.'
			});
		}
		throw redirect(303, `/${user}`);
	}
};
