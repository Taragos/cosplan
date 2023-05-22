<script lang="ts">
	import type { Database } from '$lib/models/supabase';
	export let project: Database['public']['Tables']['cosplay_projects']['Row'];

	interface Prerequisite {
		icon: string;
		text: string;
		done: boolean;
	}

	$: prerequisites = JSON.parse(JSON.stringify(project.prerequisites));
	if (project.prerequisites && project.prerequisites.length > 0) {
		prerequisites = JSON.parse(JSON.stringify(project.prerequisites));
	}

	console.log(prerequisites)
</script>

{#if prerequisites && prerequisites.length > 0}
	<div class="flex flex-row justify-center gap-4 flex-wrap backdrop-brightness-50 px-8 py-2 rounded-2xl">
		{#each prerequisites as prerequisite}
			<div
				class:selected="{prerequisite.done}"
				class={`rounded-full bg-error btn-circle text-center flex flex-col justify-center`}
			>
				<p>
					{prerequisite.icon}
				</p>
			</div>
		{/each}
	</div>
{/if}

<style>
	.selected {
		background-color: theme('colors.success');
	}
</style>