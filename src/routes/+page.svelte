<script lang="ts">
	import { onMount } from "svelte";
	import Grid from "$lib/ui/Grid.svelte";
	import Score from "$lib/ui/Score.svelte";
	import Header from "$lib/ui/Header.svelte";
	import { GameManager } from "$lib/core/GameManager";
	import { gameState } from "$lib/stores/gameState.svelte";
	import { KeyInterceptor } from "$lib/core/KeyInterceptor";
	import { SwipeInterceptor } from "$lib/core/SwipeInterceptor";

	let manager: GameManager;

	/* eslint-disable @typescript-eslint/no-unused-vars */
	let keyInterceptor: KeyInterceptor;
	let swipeInterceptor: SwipeInterceptor;
	/* eslint-enable @typescript-eslint/no-unused-vars */

	let gridElement: any;

	// TODO: May not be needed...
	onMount(() => {
		manager = new GameManager(4, 4);
		keyInterceptor = new KeyInterceptor(manager);
		swipeInterceptor = new SwipeInterceptor(manager);

		if (gridElement) {
			const preventScroll = (event: TouchEvent) => {
				event.preventDefault();
			};

			gridElement.addEventListener("touchmove", preventScroll, { passive: false });

			// Cleanup if needed
			return () => {
				gridElement.removeEventListener("touchmove", preventScroll);
			};
		}
	});
</script>

<section class="mx-auto w-full max-w-[500px] p-4">
	<Header text="Isotopic 256" />
	<div style="text-align: right;margin-bottom: 15px;">
		<Score value={gameState.currentScore} />
		<Score label="Best" value={gameState.bestScore} />
	</div>

	{#if gameState.grid.length}
		<Grid bind:this={gridElement} width={4} height={4} />
	{/if}
</section>
