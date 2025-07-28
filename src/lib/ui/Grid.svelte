<script lang="ts">
    export let width: number;
    export let height: number;
    export let isotopes: Isotope[];

    const grid: (Isotope | null)[] = [];

    // TODO: May not be the best way...
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const match = isotopes.find(i => i.x === x && i.y === y);
            grid.push(match ?? null);
        }
    }
</script>

<article
        style="
        background-color: #bbada0;
        border-radius: 6px;
        display: grid;
        grid-template-columns: repeat({width}, 1fr);
        grid-template-rows: repeat({height}, 1fr);
        padding: 15px;
        gap: 15px;
  "
>
    {#each grid as cell}
        <div class="cell {cell ? 'occupied' : 'empty'}">
            {#if cell}
                {cell.value}
            {/if}
        </div>
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