<script lang="ts">
	import { onMount } from "svelte";
	import Grid from "$lib/ui/Grid.svelte";
	import Header from "$lib/ui/Header.svelte";
	import ScoreBoard from "$lib/ui/ScoreBoard.svelte";
	import { GameManager } from "$lib/core/GameManager";
	import { gameState } from "$lib/stores/gameState.svelte";
	import { KeyInterceptor } from "$lib/core/KeyInterceptor";
	import { SwipeInterceptor } from "$lib/core/SwipeInterceptor";

	const GRID_WIDTH = 4;
	const GRID_HEIGHT = 4;

	let gridElement: HTMLElement;
	let gameManager: GameManager;

	onMount(() => {
		gameManager = new GameManager(GRID_WIDTH, GRID_HEIGHT);
		new KeyInterceptor(gameManager);
		new SwipeInterceptor(gameManager, gridElement);
	});
</script>

<section class="mx-auto w-full max-w-[500px] p-4">
	<Header text="Isotopic 2048" />
	<ScoreBoard currentScore={gameState.currentScore} bestScore={gameState.bestScore} />

	<p style="font-size: 18px;line-height: 1.65; margin-bottom:15px;color:#776e65;">
		Use your arrow or WASD keys to combine the elements to get Unobtanium-2048. Some isotopes
		may not be around for <a
			href="https://i.programmerhumor.io/2021/06/programmerhumor-io-programming-memes-cae59c41c7a3538.jpg"
			style="font-weight: bold;text-decoration: underline;"
			target="_blank">long</a
		>.
	</p>

	<Grid
		bind:this={gridElement}
		resetGame={() => {
			gameManager.reset();
		}}
		width={GRID_WIDTH}
		height={GRID_HEIGHT}
	/>

	<p style="font-size: 18px;line-height: 1.65; color:#776e65;">
		Modernized rewrite by <a
			href="https://github.com/ivanempire/isotopic-2048"
			target="_blank"
			style="font-weight: bold;text-decoration: underline;">Ivan Melnikov</a
		>, based on the idea by
		<a
			href="https://jamesmdonnelly.com/"
			style="font-weight: bold;text-decoration: underline;"
			target="_blank">James Donnelly</a
		>, original 2048 game by
		<a
			href="https://www.linkedin.com/in/gabrielecirulli/"
			style="font-weight: bold;text-decoration: underline;"
			target="_blank">Gabriele Cirulli</a
		>.
	</p>
</section>
