<script lang="ts">
    export let width: number
    export let height: number

    const rows = Array.from({ length: height }, (_, y) => y)
    const cols = Array.from({ length: width }, (_, x) => x)
</script>


<article class="grid p-[15px]" style="
    background-color: #bbada0;
    gap: 15px;
    border-radius: 6px;
    grid-template-columns: repeat({width}, minmax(0, 1fr));
  "
>
    {#each rows as y}
        {#each cols as x}
            <div
                    class="aspect-square rounded-full w-full"
                    style="background-color: rgba(238, 228, 218, 0.35);"
                    data-x={x}
                    data-y={y}
            ></div>
        {/each}
    {/each}
</article>

<style>
    article {
        display: grid;
        grid-template-columns: repeat(var(--width), 1fr);
        grid-template-rows: repeat(var(--height), 1fr);
    }
</style>