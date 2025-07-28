<script lang="ts">
	import Grid from "$lib/ui/Grid.svelte";
	import Score from "$lib/ui/Score.svelte";
	import Header from "$lib/ui/Header.svelte";
	import { GameManager } from "$lib/core/GameManager";
	import { KeyInterceptor } from "$lib/core/KeyInterceptor";
	import { gameStore } from "$lib/stores/gameStateStore";

	let manager: GameManager;
	let interceptor: KeyInterceptor;

	// Load game state from store
	const state = $gameStore;

	// On mount: initialize GameManager and KeyInterceptor
	import { onMount } from "svelte";

	onMount(() => {
		manager = new GameManager(4, 4);
		interceptor = new KeyInterceptor(manager);
	});
</script>

<section class="mx-auto w-full max-w-[500px] p-4">
	<Header text="Isotopic 256" />
	<Score value={state.currentScore} />
	<Score label="Best" value={state.bestScore} />

	{#if state.grid.length}
		<Grid width={4} height={4} />
	{/if}

	{#if state.status === "WIN"}
		<p>You win!</p>
	{:else if state.status === "LOSS"}
		<p>Game over.</p>
	{/if}
</section>
