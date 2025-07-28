<script lang="ts">
    export let text: string
</script>

<h1>{text}</h1>

<style>
    h1 {
        font-size: 80px;
        font-weight: bold;
        margin: 0;
        display: block;
        float: left;
        color: #776e65;
        /* TODO: Import clear sans*/
        font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
    }
</style>