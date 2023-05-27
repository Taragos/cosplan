<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';

	export let supabase: SupabaseClient;
    export let session: Session | null;

    const submitLogout: SubmitFunction = async ({ cancel }) => {
		const { error } = await supabase.auth.signOut();

		cancel();
	};
</script>

{#if session}
<form action="/logout" method="POST" use:enhance={submitLogout}>
	<button type="submit" class="mx-auto">
		Logout
		<!-- <Icon class="mx-auto" src={ArrowLeftOnRectangle} solid size="24" /> -->
	</button>
</form>
{:else}
    <a href="/login">
        Login
    </a>
{/if}
