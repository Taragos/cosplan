<script lang="ts">
	export let data;
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { Icon, PlusCircle } from 'svelte-hero-icons';

	let { projects, username, session } = data;
</script>

<div class="flex flex-row gap-8 justify-center flex-wrap">
	{#if projects}
		{#each projects as project}
			<ProjectCard {project} session={session} username={username}/>
		{/each}
	{/if}

	{#if session}
		<a
			href={`/${username}/create`}
			class="artboard artboard-demo phone-1 border-4 border-dashed border-gray-300 hover:bg-gray-300 hover:cursor-pointer"
		>
			<Icon src={PlusCircle} size="64" />
		</a>
	{/if}
</div>
