<script lang="ts">
	import Grid from "$lib/ui/Grid.svelte";
	import Score from "$lib/ui/Score.svelte";
	import Header from "$lib/ui/Header.svelte";
	import { GameManager } from "$lib/core/GameManager";
	import { gameState } from "$lib/stores/gameState.svelte";
	import { KeyInterceptor } from "$lib/core/KeyInterceptor";

	let manager: GameManager;
	let interceptor: KeyInterceptor;

	// On mount: initialize GameManager and KeyInterceptor
	import { onMount } from "svelte";

	onMount(() => {
		manager = new GameManager(4, 4);
		interceptor = new KeyInterceptor(manager);
	});
</script>

<section class="mx-auto w-full max-w-[500px] p-4">
	<Header text="Isotopic 256" />
	<Score value={gameState.currentScore} />
	<Score label="Best" value={gameState.bestScore} />

	{#if gameState.grid.length}
		<Grid width={4} height={4} />
	{/if}
</section>
