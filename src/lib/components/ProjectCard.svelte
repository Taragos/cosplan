<script lang="ts">
	import type { Database } from '$lib/models/supabase';
	import type { Session } from '@supabase/supabase-js';
	import PrerequisitesButtons from './PrerequisitesButtons.svelte';
	import ProjectHeader from './ProjectHeader.svelte';
	import Info from './Info.svelte';
	import PrerequisiteInfo from './PrerequisiteInfo.svelte';
	export let project: Database['public']['Tables']['cosplay_projects']['Row'];
	export let session: Session | null;
	export let username: string | undefined;

	let flipped = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	style={`background-image: url('https://tzsfddvsacbzdiqxzbbh.supabase.co/storage/v1/object/public/images/${project.image}')`}
	class={`artboard artboard-demo phone-1 bg-cover bg-center bg-no-repeat rounded-lg`}
	on:click={() => (flipped = !flipped)}
>
	{#if !flipped}
		<div
			class="w-full h-full backdrop-brightness-75 flex flex-col items-center p-4 justify-between"
		>
			<ProjectHeader {project} {session} {username} />
			<PrerequisitesButtons {project} />
		</div>
	{:else}
		<div
			class="w-full h-full backdrop-brightness-50 backdrop-blur-lg rounded-lg flex flex-col p-4 gap-4"
		>
		<ProjectHeader {project} {session} {username} />
		<div class="divider text-primary-content">Info</div>
		<Info value={project.character} name={"Character"}/>
		<Info value={project.origin} name={"Origin"}/>
		<Info value={project.current_stage} name={"Stage"} />
		<div class="divider text-primary-content">Prerequisites</div>
		<PrerequisiteInfo project={project}/>
	</div>
	{/if}
</div>
