<script lang="ts">
	import type { Database } from '$lib/models/supabase';
	import type { Session } from '@supabase/supabase-js';
	import { Icon, Pencil } from 'svelte-hero-icons';
	export let project: Database['public']['Tables']['cosplay_projects']['Row'];
	export let session: Session | null;
	export let username: string | undefined;
</script>

<div class="flex flex-row w-full justify-center items-center gap-2">
	<h2
		class="w-4/5 bg-primary rounded text-center text-primary-content font-bold p-2 justify-self-center"
	>
		{project.title}
	</h2>
	{#if session}
		<a href={`/${username}/edit/${project.id}`} class="btn btn-warning btn-circle btn-sm">
			<Icon src={Pencil} size="16" />
		</a>
	{/if}
</div>
