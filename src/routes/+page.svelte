<script lang="ts">

    import Grid from "$lib/ui/Grid.svelte";
    import Score from "$lib/ui/Score.svelte";
    import Header from "$lib/ui/Header.svelte";
    import { GameManager } from "$lib/core/GameManager";

    const manager = new GameManager(4, 4);
    let isotopes = manager.getIsotopes();

</script>

<section class="max-w-2xl mx-auto px-4 flex flex-col items-center gap-4">
    <Score value={50} />
    <Score label="Best" value={100} />
<!--    <Header text="Isotopic 256" />-->

<!--    <div class="flex gap-4">-->
<!--        <Score value={50} />-->
<!--        <Score label="Best" value={100} />-->
<!--    </div>-->

<!--    <Grid width={4} height={4} isotopes={isotopes} />-->
</section>