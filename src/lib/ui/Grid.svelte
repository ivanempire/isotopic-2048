<script lang="ts">
	export let width: number;
	export let height: number;
	export let isotopes: Isotope[];

	type Isotope = {
		id: number;
		value: number;
		x: number;
		y: number;
		merging?: boolean;
		new?: boolean;
		decay?: number;
	};

	console.log('Got isotopes: ', isotopes);

	// Optional: construct a quick lookup map for faster rendering
	const cellMap = new Map<string, Isotope>();
	$: {
		cellMap.clear();
		for (const iso of isotopes) {
			cellMap.set(`${iso.x},${iso.y}`, iso);
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
	{#each Array(height) as _, y}
		{#each Array(width) as _, x}
			{#if cellMap.has(`${x},${y}`)}
				<div class="cell occupied">
					{cellMap.get(`${x},${y}`)?.value}
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
