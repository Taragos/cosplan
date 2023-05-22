<script lang="ts">
	import type { Database } from '$lib/models/supabase';
	export let project: Database['public']['Tables']['cosplay_projects']['Row'];

	interface Prerequisite {
		icon: string;
		text: string;
		done: boolean;
	}

	let prerequisites: Prerequisite[] = [];
	if (project.prerequisites && project.prerequisites.length > 0) {
		prerequisites = JSON.parse(JSON.stringify(project.prerequisites));
	}
</script>

{#if prerequisites && prerequisites.length > 0}
	<div class="backdrop-brightness-75 flex flex-col gap-4 p-2 rounded-lg overflow-y-scroll">
		{#each prerequisites as prerequisite}
			<div
				class="flex flex-row gap-4 justify-between items-center backdrop-brightness-50 rounded-lg"
			>
				<h3
				class:selected="{prerequisite.done}"
				class={`bg-error w-12 text-center p-2 font-bold rounded-lg text-primary-content`}
				>
					{prerequisite.icon}
				</h3>
				<p class={`pr-2 text-primary-content ${prerequisite.done ? "line-through" : ""}`}>{prerequisite.text}</p>
			</div>
		{/each}
	</div>
{/if}


<style>
	.selected {
		background-color: theme('colors.success');
	}
</style>