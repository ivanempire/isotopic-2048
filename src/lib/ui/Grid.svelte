<script lang="ts">
	export let width: number;
	export let height: number;
	export let isotopes: Isotope[];

	const grid: (Isotope | null)[][] = [];

	$: {
		grid.length = 0;
		for (let y = 0; y < height; y++) {
			const row: (Isotope | null)[] = [];
			for (let x = 0; x < width; x++) {
				row.push(null);
			}
			grid.push(row);
		}

		for (const iso of isotopes) {
			grid[iso.y][iso.x] = iso;
		}
	}

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
