<script lang="ts">
    export let width: number;
    export let height: number;
    export let isotopes: Isotope[];

    // Create row/column coordinate pairs
    const coordinates = Array.from({ length: height * width }, (_, i) => ({
        x: i % width,
        y: Math.floor(i / width)
    }));

    function isotopeAt(x: number, y: number): Isotope | undefined {
        return isotopes.find(t => t.x === x && t.y === y);
    }
</script>

<div
        class="grid relative"
        style="
    grid-template-columns: repeat({width}, 1fr);
    grid-template-rows: repeat({height}, 1fr);
    gap: 15px;
    padding: 15px;
    background-color: #bbada0;
  "
>
    {#each coordinates as { x, y }}
        <div class="relative w-full aspect-square rounded-full bg-[#eee4da] flex items-center justify-center" style="border:1px solid red;width:50px;height:50px;">
            {#if isotopeAt(x, y)}
                <div>{isotopeAt(x, y).value}</div>
            {/if}
        </div>
    {/each}
</div>
