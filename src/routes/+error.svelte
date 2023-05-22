<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="h-screen flex flex-col justify-center content-center">
	<h1 class="p-4 text-8xl text-center">{$page.error?.message}</h1>
	<h3 class="text-center text-base-content">Create an <a href="/signup" class="underline">Account</a> to join!</h3>
</div>