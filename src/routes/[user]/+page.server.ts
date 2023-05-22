import type { Session, SupabaseClient } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';
import type { Database } from '$lib/models/supabase';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({
	params: { user },
	locals: { supabase, getSession }
}) => {
	const session = await getSession();
	const projects = await getProjects(user, session, supabase);

	if (!projects) {
		return fail(500)
	}

	return {
		projects,
		username: user
	};
};

const getProjects = async (username: string, session: Session | null, supabase: SupabaseClient<Database>) => {
	if (!session) {
		const { data: result } = await supabase
			.from('cosplay_projects')
			.select(`*, profile(username)`)
			.eq(`current_visibility`, 'Public')
			.eq('profile.username', username);

		return result
	} else {
		const { data: projects } = await supabase
			.from('cosplay_projects')
			.select(`*`)
			.eq('profile', session.user.id);
		return projects;
	}
};
