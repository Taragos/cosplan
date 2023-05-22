<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { createProjectSchema } from '$lib/models/formData';
	import FormErrors from '$lib/components/FormErrors.svelte';
	import { Icon, ArrowLongLeft, PlusCircle } from 'svelte-hero-icons';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	export let data: PageData;
	const { username } = data;

	const showPreview = (event: any) => {
		const {
			target: { files }
		} = event;

		if (files.length > 0) {
			const src = URL.createObjectURL(files[0]);
			const preview = document.getElementById('avatar-preview') as HTMLImageElement;

			if (preview) {
				preview.src = src;
			}
		}
	};

	const addEmptyPrerequisite = () => {
		$form.prerequisites.push({ text: '', icon: '', done: false });
	};

	const { form, errors, enhance } = superForm(data.form, {
		taintedMessage: 'Are you sure you want to leave?',
		validators: createProjectSchema,
		dataType: 'json'
	});

</script>

<SuperDebug data={$form} />
<div class="flex flex-col gap-4">
	<div class="flex flex-row items-center gap-4">
		<a href={`/${username}`}><Icon src={ArrowLongLeft} size="32" /></a>
		<h1 class="text-4xl">Edit your Project</h1>
	</div>
	<form method="POST" use:enhance class="flex flex-row gap-4">
		<div class="form-control justify-self-start">
			<label
				for="image"
				class="artboard artboard-demo phone-1 rounded-2xl bg-blue-400 hover:cursor-pointer"
			>
				<div class="w-full h-full">
					<img
						src={`https://tzsfddvsacbzdiqxzbbh.supabase.co/storage/v1/object/public/images/${$form.image}`}
						alt="user avatar"
						class="w-full h-full object-cover rounded-2xl"
						id="avatar-preview"
					/>
				</div>
			</label>
			<input type="file" name="image" id="image" on:change={showPreview} accept="image/*" hidden />
		</div>
		<div class="grow">
			<div class="form-control">
				<label class="label" for="title">
					<span class="label-text">Title</span>
				</label>
				<input
					type="text"
					name="title"
					id="title"
					placeholder="Cosplay Project Title"
					bind:value={$form.title}
					class={`${$errors.title ? 'border-error' : ''} input input-bordered`}
				/>
				<FormErrors errors={$errors.title} />
			</div>
			<div class="flex flex-row gap-4 w-full">
				<div class="form-control w-1/2">
					<label class="label" for="character">
						<span class="label-text">Character</span>
					</label>
					<input
						type="text"
						id="character"
						placeholder="Character e.g. Yae Miko"
						name="character"
						bind:value={$form.character}
						class={`${$errors.character ? 'border-error' : ''} input input-bordered`}
					/>
					<FormErrors errors={$errors.character} />
				</div>
				<div class="form-control w-1/2">
					<label class="label" for="origin">
						<span class="label-text">Origin</span>
					</label>
					<input
						type="text"
						id="origin"
						placeholder="Character Origin e.g. Genshin Impact"
						name="origin"
						bind:value={$form.origin}
						class={`${$errors.origin ? 'border-error' : ''} input input-bordered`}
					/>
					<FormErrors errors={$errors.origin} />
				</div>
			</div>
			<div class="flex flex-row gap-4 w-full">
				<div class="form-control w-1/2">
					<label class="label" for="current_stage">
						<span class="label-text">Project Stage</span>
					</label>
					<select
						id="current_stage"
						class={`${$errors.current_stage ? 'border-error' : ''} select select-bordered`}
						bind:value={$form.current_stage}
					>
						<option disabled selected>Pick one</option>
						<option>Planned</option>
						<option>In Progress</option>
						<option>Finished</option>
						<option>Archived</option>
					</select>
					<FormErrors errors={$errors.current_stage} />
				</div>
				<div class="form-control w-1/2">
					<label class="label" for="current_visibility">
						<span class="label-text">Project Visibility</span>
					</label>
					<select
						id="current_visibility"
						class={`${$errors.current_stage ? 'border-error' : ''} select select-bordered`}
						bind:value={$form.current_visibility}
					>
						<option disabled selected>Pick one</option>
						<option>Public</option>
						<option>Mistify</option>
						<option>Hide</option>
					</select>
					<FormErrors errors={$errors.current_visibility} />
				</div>
			</div>
			<div class="form-control">
				<label class="label" for="title">
					<span class="label-text">Prerequisites</span>
				</label>
				<div class="flex flex-col gap-4">
					{#each $form.prerequisites as _, index}
						<div class="flex flex-row w-full gap-4 items-center">
							<input
								type="text"
								placeholder="Icon"
								bind:value={$form.prerequisites[index].icon}
								class={`${
									$errors.prerequisites?.[index]?.icon ? 'border-error' : ''
								} input input-bordered w-16`}
							/>
							<input
								type="text"
								placeholder="Prerequisite"
								bind:value={$form.prerequisites[index].text}
								class={`${
									$errors.prerequisites?.[index]?.text ? 'border-error' : ''
								} input input-bordered grow`}
							/>
							<input type="checkbox" class="toggle" bind:checked={$form.prerequisites[index].done} />
						</div>
						<!-- <FormErrors errors={$errors.prerequisites} /> -->
					{/each}
				</div>
			</div>
			<button class="flex flex-row justify-center w-full mt-4" on:click={addEmptyPrerequisite}>
				<Icon src={PlusCircle} size="32" />
			</button>
			<div class="form-control mt-4">
				<button class="btn btn-primary">Update</button>
			</div>
			<div class="form-control mt-4">
				<button
					name="delete"
					value="delete"
					on:click={(e) => !confirm('Are you sure?') && e.preventDefault()}
					class="btn btn-error">Delete</button
				>
			</div>
		</div>
	</form>
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
