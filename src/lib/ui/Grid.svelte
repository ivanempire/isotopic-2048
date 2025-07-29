<script lang="ts">
	export let width: number;
	export let height: number;
	import { gameState } from "$lib/stores/gameState.svelte";
	import { getLabelFromMass } from "$lib/core/IsotopeStyling";
</script>

<article
	style="
    display: grid;
    border-radius: 6px;
    background-color: #bbada0;
    grid-template-columns: repeat({width}, 1fr);
    grid-template-rows: repeat({height}, 1fr);
    padding: 15px;
    gap: 15px;
  "
>
	{#each gameState.grid as row}
		{#each row as cell}
			{#if cell}
				{@const style = getLabelFromMass(cell.mass)}
				<div
					class="cell occupied {style.stylingClass} {cell.new ? 'new' : ''}"
					style="
					display: flex;
					justify-content: center;
					font-weight: bold;
					font-size: 55px;
					align-items: center;
					border-radius: 50%;
					position: relative;
				"
					title={style.name}
				>
					{style.label}

					{#if cell.decay !== undefined}
						<div
							style="
							position: absolute;
							bottom: 4px;
							right: 6px;
							font-size: 0.75rem;
							opacity: 0.7;
						"
						>
							{cell.decay}
						</div>
					{/if}
				</div>
			{:else}
				<div class="cell empty"></div>
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
		-webkit-transition: 100ms ease-in-out;
		-moz-transition: 100ms ease-in-out;
		transition: 100ms ease-in-out;
		-webkit-transition-property: -webkit-transform;
		-moz-transition-property: -moz-transform;
		transition-property: transform;
	}

	.occupied {
		background: #ccc;
	}

	.empty {
		background: #cdc1b4;
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

	.new {
		/*-webkit-animation: appear 200ms ease 100ms;*/
		/*-moz-animation: appear 200ms ease 100ms;*/
		/*animation: appear 200ms ease 100ms;*/
		/*-webkit-animation-fill-mode: backwards;*/
		/*-moz-animation-fill-mode: backwards;*/
		/*animation-fill-mode: backwards;*/
	}

	@keyframes appear {
		0% {
			opacity: 0;
			-webkit-transform: scale(0);
			-moz-transform: scale(0);
			transform: scale(0);
		}

		100% {
			opacity: 1;
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			transform: scale(1);
		}
	}

	@-webkit-keyframes shake {
		from {
			width: 115px;
			height: 115px;
			margin-left: -4px;
			margin-top: -4px;
		}
		to {
			width: 107px;
			height: 107px;
			margin-left: 0;
			margin-top: 0;
		}
	}

	@-moz-keyframes shake {
		from {
			width: 115px;
			height: 115px;
			margin-top: -4px;
			margin-left: -4px;
		}
		to {
			width: 107px;
			height: 107px;
			margin-top: 0;
			margin-left: 0;
		}
	}

  @keyframes pop {
      0% {
          transform: scale(0);
      }

      50% {
          transform: scale(1.2);
      }

      100% {
          transform: scale(1);
      }
  }

	/*.unstable {*/
	/*    -webkit-animation-name: shake;*/
	/*    -webkit-animation-duration: 0.1s;*/
	/*    -webkit-transition-property: -webkit-transform;*/
	/*    -webkit-transition-duration: 1s;*/
	/*    -webkit-animation-iteration-count: infinite;*/
	/*    -webkit-animation-timing-function: linear;*/

	/*    -moz-animation-name: shake;*/
	/*    -moz-animation-duration: 0.1s;*/
	/*    -moz-transition-property: -moz-transform;*/
	/*    -moz-transition-duration: 1s;*/
	/*    -moz-animation-iteration-count: infinite;*/
	/*    -moz-animation-timing-function: linear;*/
	/*}*/
</style>
