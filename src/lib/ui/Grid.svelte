<script lang="ts">
	import { fade } from "svelte/transition";
	import Stencil from "$lib/ui/Stencil.svelte";
	import { gameState } from "$lib/stores/gameState.svelte";
	import { getLabelFromMass } from "$lib/core/IsotopeStyling";

	let { width, height, resetGame } = $props();
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
					class="cell occupied {style.stylingClass} {cell.new
						? 'new'
						: ''} {cell.radioactive ? 'tile-unstable' : ''}"
					style="
	left: calc(var(--padding) + ({cell.x}) * (100% - 2 * var(--padding) - (var(--cols) - 1) * var(--gap)) / var(--cols) + {cell.x} * var(--gap));
	top: calc(var(--padding) + ({cell.y}) * (100% - 2 * var(--padding) - (var(--rows) - 1) * var(--gap)) / var(--rows) + {cell.y} * var(--gap));
"
					title={style.name}
				>
					<div class="element">
						<div class="mass">{cell.mass}</div>
						<div class="label">{style.label}</div>
						{#if cell.decayCount !== undefined}
							<div class="decay">{cell.decayCount}</div>
						{/if}
					</div>
				</div>
			{/if}
		{/each}
	</div>

	{#if gameState.status === "WIN" || gameState.status === "LOSS"}
		<div class="game-overlay" transition:fade={{ duration: 300 }}>
			<p>{gameState.status === "WIN" ? "You Win!" : "Game Over"}</p>
			<button onclick={() => resetGame()}>Play again</button>
		</div>
	{/if}
</article>

<style>
	.grid-wrapper {
		position: relative;
		width: 100%;
		aspect-ratio: var(--cols) / var(--rows);
		margin-bottom: 15px;
	}

	.game-overlay {
		color: white;
		width: 100%;
		height: 100%;
		z-index: 100;
		display: flex;
		font-size: 4rem;
		font-weight: bold;
		position: absolute;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		text-transform: uppercase;
		background-color: rgba(246, 94, 59, 0.2);
	}

	.game-overlay button {
		padding: 5px 10px;
		font-size: 1.5rem;
		border-radius: 6px;
		background: #f2b179;
	}

	.tile-layer {
		position: absolute;
		inset: 0;
		padding: 15px;
	}

	@keyframes appear {
		from {
			opacity: 0;
			transform: scale(0);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.cell {
		border-radius: 50%;
		transition:
			left 100ms ease-in-out,
			top 100ms ease-in-out;
	}

	/* TODO: Do not apply this to a fused one. */
	.new {
		animation: appear 200ms ease 100ms backwards;
	}

	.tile-layer .cell {
		position: absolute;
		width: calc((100% - (var(--cols) - 1) * var(--gap) - 2 * var(--padding)) / var(--cols));
		height: calc((100% - (var(--rows) - 1) * var(--gap) - 2 * var(--padding)) / var(--rows));
	}

	.element {
		width: 100%;
		height: 100%;
		display: flex;
		font-weight: bold;
		text-align: center;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}

	.mass {
		height: 1em;
		line-height: 1;
		font-size: 1.2em;
		margin-bottom: 2px;
	}

	.label {
		line-height: 1;
		font-size: 2em;
	}

	.decay {
		height: 1em;
		opacity: 0.7;
		line-height: 1;
		margin-top: 2px;
		font-size: 0.9em;
	}

	.hydrogen-2 {
		color: #776e65;
		background-color: #eee4da;
	}

	.helium-4 {
		color: #776e65;
		background-color: #eedebc;
	}

	.beryllium-8 {
		color: #f9f6f2;
		background-color: #eaaa95;
	}

	.oxygen-16 {
		color: #f9f6f2;
		background-color: #efbe62;
		box-shadow: 0 0 30px 10px #efbe62;
	}

	.phosphorus-32 {
		color: #f9f6f2;
		background-color: #e88868;
	}

	.nickel-64 {
		color: #f9f6f2;
		background-color: #f1b162;
		box-shadow: 0 0 30px 10px #f1b162;
	}

	.tin-128 {
		color: #f9f6f2;
		background-color: #e76a6e;
	}

	.nobelium-256 {
		color: #f9f6f2;
		background-color: #fcc7ab;
		box-shadow: 0 0 30px 10px #fcc7ab;
	}

	.germanium-512 {
		color: #f9f6f2;
		background-color: #f57345;
		box-shadow: 0 0 30px 10px #f57345;
	}

	.unobtanium-1024 {
		color: #f9f6f2;
		background-color: #896ecf;
	}

	.unobtanium-2048 {
		color: #f9f6f2;
		background-color: #f65e3b;
		box-shadow: 0 0 30px 10px #f65e3b;
	}

	@-webkit-keyframes shake {
		from {
			transform: scale(1.07);
		}
		to {
			transform: scale(1);
		}
	}

	@-moz-keyframes shake {
		from {
			transform: scale(1.07);
		}
		to {
			transform: scale(1);
		}
	}

	/*TODO: Put vendor stuff back */
	.tile-unstable {
		animation-name: shake;
		animation-duration: 0.1s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
		transform-origin: center center;
	}
</style>
