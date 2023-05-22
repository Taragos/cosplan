<script lang="ts">
	export let data;
	import AuthButton from '$lib/components/AuthButton.svelte';

	let { username, supabase, session } = data;
</script>

<div class="p-4">
	<div class="flex flex-row justify-between items-center py-4">
		<h1 class="text-8xl text-center mb-4">{username}</h1>
		<AuthButton {supabase} {session} />
	</div>
    <slot />
</div>
