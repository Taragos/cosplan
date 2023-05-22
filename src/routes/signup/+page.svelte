<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { signUpSchema } from '$lib/models/formData';
	import FormErrors from '$lib/components/FormErrors.svelte';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form, {
		taintedMessage: 'Are you sure you want to leave?',
		validators: signUpSchema
	});
</script>

<div class="hero min-h-screen">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">Join the CosHub Community today!</h1>
			<p class="py-6">
				Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
				quasi. In deleniti eaque aut repudiandae et a id nisi.
			</p>
		</div>
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				<h1 class="text-4xl">Sign Up</h1>
				<form use:enhance method="POST" action="/signup">
                    <div class="form-control">
						<label class="label" for="username">
							<span class="label-text">Username</span>
						</label>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="username"
							bind:value={$form.username}
							class={`${$errors.username ? 'border-error' : ''} input input-bordered`}
						/>
						<FormErrors errors={$errors.username} />
					</div>
					<div class="form-control">
						<label class="label" for="email">
							<span class="label-text">Email</span>
						</label>
						<input
							type="text"
							name="email"
							id="email"
							placeholder="email"
							bind:value={$form.email}
							class={`${$errors.email ? 'border-error' : ''} input input-bordered`}
						/>
						<FormErrors errors={$errors.email} />
					</div>
					<div class="form-control">
						<label class="label" for="password">
							<span class="label-text">Password</span>
						</label>
						<input
							type="password"
							id="password"
							placeholder="*********"
							name="password"
							bind:value={$form.password}
							class={`${$errors.password ? 'border-error' : ''} input input-bordered`}
						/>
						<FormErrors errors={$errors.password} />
					</div>
					<div class="form-control p-4">
						<button class="btn btn-primary">Sign Up</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	:global(.touched:invalid) {
		border-color: theme('colors.error');
		outline-color: theme('colors.error');
	}

	:global(.svelte-use-form-hint) {
		color: theme('colors.error');
	}
</style>
