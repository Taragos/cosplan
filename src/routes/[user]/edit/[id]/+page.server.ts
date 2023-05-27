import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { createProjectSchema } from '$lib/models/formData';
import { uploadFile } from '$lib/utils/storage';

export const load: PageServerLoad = async (event) => {
	const {
		params: { user, id },
		locals: { getSession, supabase }
	} = event;

	const session = await getSession();

	// if the user is already logged in return them to the account page
	if (!session) {
		throw redirect(303, `/${user}`);
	}

	const { data } = await supabase.from('cosplay_projects').select('*').eq('id', id).single();
	const form = await superValidate(event, createProjectSchema);
	if (data) {
		form.data.title = data.title;
		form.data.character = data.character;
		form.data.origin = data.origin;
		form.data.current_stage = data.current_stage;
		form.data.current_visibility = data.current_visibility;
		form.data.image = data.image;
		if (data.prerequisites) {
			form.data.prerequisites = JSON.parse(JSON.stringify(data.prerequisites));
		}
	}
	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const {
			request,
			params: { id, user },
			locals
		} = event;

		const formData = await request.formData();
		const form = await superValidate(formData, createProjectSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const { getSession, supabase } = locals;

		const session = await getSession();

		if (!session) {
			throw redirect(302, `/${user}`);
		}

		if (formData.has('delete')) {
			const { error } = await supabase.from('cosplay_projects').delete().eq('id', id);

			if (error) {
				fail(500, {
					form
				});
			}
		}

		const file = formData.get('image');
		const fileData = await uploadFile(file, supabase);

		const { data, error: err, status } = await supabase.from('cosplay_projects').update({
			...form.data,
			image: fileData?.path
		}).eq('id', id);

		if (err) {
			return fail(500, {
				message: 'Server error. Try again later.'
			});
		}

		throw redirect(303, `/${user}`);
	}
};
