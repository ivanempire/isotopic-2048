<script lang="ts">
	export let width: number;
	export let height: number;

	import Stencil from "$lib/ui/Stencil.svelte";
	import { gameState } from "$lib/stores/gameState.svelte";
	import { getLabelFromMass } from "$lib/core/IsotopeStyling";
</script>

<article
	class="grid-wrapper"
	style="--cols: {width}; --rows: {height}; --gap: 15px; --padding: 15px;"
>
	<Stencil {width} {height} />

	<div class="tile-layer">
		{#each gameState.grid.flat() as cell (cell ? cell.id : Math.random())}
			{#if cell}
				{@const style = getLabelFromMass(cell.mass)}
				<div
					class="cell occupied {style.stylingClass} {cell.new ? 'new' : ''}"
					style="
	left: calc(var(--padding) + ({cell.x}) * (100% - 2 * var(--padding) - (var(--cols) - 1) * var(--gap)) / var(--cols) + {cell.x} * var(--gap));
	top: calc(var(--padding) + ({cell.y}) * (100% - 2 * var(--padding) - (var(--rows) - 1) * var(--gap)) / var(--rows) + {cell.y} * var(--gap));
"
					title={style.name}
				>
					<div class="content">
						<div class="mass-block">{cell.mass}</div>
						<div class="label">{style.label}</div>
						{#if cell.decayCount !== undefined}
							<div class="decay">{cell.decayCount}</div>
						{/if}
					</div>
				</div>
			{/if}
		{/each}
	</div>
</article>

<style>
	.grid-wrapper {
		position: relative;
		width: 100%;
		aspect-ratio: var(--cols) / var(--rows);
	}

	.tile-layer {
		position: absolute;
		inset: 0;
		padding: 15px;
	}

	.cell {
		border-radius: 50%;
	}

	.tile-layer .cell {
		position: absolute;
		width: calc((100% - (var(--cols) - 1) * var(--gap) - 2 * var(--padding)) / var(--cols));
		height: calc((100% - (var(--rows) - 1) * var(--gap) - 2 * var(--padding)) / var(--rows));
	}

	.cell .content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		position: relative;
		text-align: center;
	}

	.mass-block {
		align-self: flex-start;
		margin-left: 8px;
		margin-top: 6px;
		margin-bottom: 4px;
		font-size: 0.75rem;
		font-weight: 600;
		opacity: 0.8;
		background-color: rgba(255, 255, 255, 0.3);
		padding: 2px 6px;
		border-radius: 4px;
		pointer-events: none;
	}

	.label {
		font-size: 1.8rem;
		font-weight: bold;
		pointer-events: none;
		line-height: 1;
	}

	.decay {
		position: absolute;
		bottom: 4px;
		right: 6px;
		font-size: 0.75rem;
		opacity: 0.7;
		pointer-events: none;
	}
	.occupied {
		background: #ccc;
	}

	.hydrogen-2 {
		color: #776e65;
		background-color: #eee4da;
		box-shadow:
			0 0 30px 10px rgba(243, 215, 116, 0),
			inset 0 0 0 1px rgba(255, 255, 255, 0);
	}

	.helium-4 {
		color: #776e65;
		background-color: #ede0c8;
		box-shadow:
			0 0 30px 10px rgba(243, 215, 116, 0),
			inset 0 0 0 1px rgba(255, 255, 255, 0);
	}

	.beryllium-8 {
		color: #f9f6f2;
		background-color: #f2b179;
	}

	.oxygen-16 {
		color: #f9f6f2;
		background-color: #f59563;
		box-shadow:
			0 0 30px 10px #f2b179,
			inset 0 0 0 1px rgba(255, 255, 255, 0.2381);
	}

	.phosphorus-32 {
		color: #f9f6f2;
		background-color: #f67c5f;
	}

	.nickel-64 {
		color: #f9f6f2;
		background-color: #f65e3b;
		box-shadow:
			0 0 30px 10px #f67c5f,
			inset 0 0 0 1px rgba(255, 255, 255, 0.2381);
	}

	.tin-128 {
		color: #f9f6f2;
		background-color: #edcf72;
		box-shadow:
			0 0 30px 10px rgba(243, 215, 116, 0.2381),
			inset 0 0 0 1px rgba(255, 255, 255, 0.14286);
	}

	.nobelium-256 {
		color: #f9f6f2;
		background-color: #edcc61;
		box-shadow:
			0 0 30px 10px #edcf72,
			inset 0 0 0 1px rgba(255, 255, 255, 0.2381);
	}

	.germanium-512 {
		color: #f9f6f2;
		background-color: #3c3a32;
		box-shadow:
			0 0 30px 10px #edcf72,
			inset 0 0 0 1px rgba(255, 255, 255, 0.2381);
	}

	.unobtanium-1024 {
		color: #f9f6f2;
		background-color: #3c3a32;
		box-shadow:
			0 0 30px 10px #edcf72,
			inset 0 0 0 1px rgba(255, 255, 255, 0.2381);
	}
</style>
