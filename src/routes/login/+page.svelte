<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { loginSchema } from '$lib/models/formData';
	import FormErrors from '$lib/components/FormErrors.svelte';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form, {
		taintedMessage: 'Are you sure you want to leave?',
		validators: loginSchema
	});
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="hero min-h-screen ">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">Create your own Cosplan Manger today!</h1>
			<p class="py-6">
				Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
				quasi. In deleniti eaque aut repudiandae et a id nisi.
			</p>
		</div>
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				<h1 class="text-4xl">Login</h1>
				<form method="POST" use:enhance class="flex flex-col gap-2">
					<div class="form-control">
						<label class="label" for="email">
							<span class="label-text">E-Mail</span>
						</label>
						<input
							type="text"
							name="email"
							id="email"
							placeholder="E-Mail"
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
					<div>
						<a href="/password/reset" class="text-sm mt-2 underline text-accent">Forgot Password?</a
						>
					</div>
					<div class="form-control mt-4">
						<button class="btn btn-primary">Login</button>
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
