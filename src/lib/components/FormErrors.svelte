<script lang="ts">
	export let errors: string[] | undefined;
</script>

{#if errors}
	<div class="flex flex-col gap-1 text-error mt-1">
		{#each errors as error}
			<small>{error}</small>
		{/each}
	</div>
{/if}

