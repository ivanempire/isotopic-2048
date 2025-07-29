<script lang="ts">
	/* eslint-disable */
	export let width: number;
	export let height: number;
</script>

<div class="grid-background">
	{#each Array(height) as _, y}
		{#each Array(width) as _, x}
			<div class="cell empty"></div>
		{/each}
	{/each}
</div>

<style>
	.grid-background {
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		grid-template-rows: repeat(var(--rows), 1fr);
		gap: 15px;
		background-color: #bbada0;
		border-radius: 6px;
		padding: 15px;
		position: absolute;
		inset: 0;
	}

	.cell {
		border-radius: 50%;
	}

	.empty {
		background: #cdc1b4;
	}
</style>
