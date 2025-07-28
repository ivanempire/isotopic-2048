<script lang="ts">
	export let width: number;
	export let height: number;

	import type { Isotope } from "$lib/core/Isotope";
	import { gameStore } from "$lib/stores/gameStateStore";

	// const grid: (Isotope | null)[][] = $gameStore.grid;
	let { grid } = $gameStore;
	console.log(grid);
</script>

<article
	style="
    display: grid;
    grid-template-columns: repeat({width}, 1fr);
    grid-template-rows: repeat({height}, 1fr);
    padding: 15px;
    gap: 15px;
  "
>
	{#each grid as row}
		{#each row as cell}
			{#if cell}
				<div class="cell occupied">
					{cell.value}
				</div>
			{:else}
				<div class="cell empty" />
			{/if}
		{/each}
	{/each}
</article>

<style>
	.cell {
		aspect-ratio: 1 / 1;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 1.2rem;
	}

	.occupied {
		background: #ccc;
	}

	.empty {
		background: #f0f0f0;
	}
</style>
