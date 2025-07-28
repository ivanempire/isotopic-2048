<script lang="ts">
	import { onMount } from 'svelte';
	import Grid from '$lib/ui/Grid.svelte';
	import Score from '$lib/ui/Score.svelte';
	import Header from '$lib/ui/Header.svelte';
	import { GameManager } from '$lib/core/GameManager';
	import { KeyInterceptor } from '$lib/core/KeyInterceptor';

	let isotopes: Isotope[] = [];

	onMount(() => {
		const manager = new GameManager(4, 4);
		const keyInterceptor = new KeyInterceptor(manager);
		isotopes = manager.getIsotopes();
		// isotopes = [...manager.getIsotopes()];
	});
</script>

<section style="width:500px;border:1px solid red;">
	<Header text="Isotopic 256" />
	<Score value={50} />
	<Score label="Best" value={100} />
	<!-- TODO: Hack because it's not a store... -->
	{#if isotopes.length}
		<p>Isotopes loaded: {isotopes.length}</p>
		<Grid width={4} height={4} {isotopes} />
	{/if}
</section>
