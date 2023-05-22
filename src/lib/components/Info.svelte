<script lang="ts">
    export let value: string;
    export let name: string;
</script>

<div class="flex flex-row gap-4 justify-between items-center backdrop-brightness-50 rounded-lg">
	<h3 class="bg-primary w-1/3 p-2 font-bold rounded-lg text-primary-content">{name}</h3>
	<p class="pr-2 text-primary-content">{value}</p>
</div>
