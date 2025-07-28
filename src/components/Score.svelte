<script lang="ts">
    export let label: string = "Score";
    export let value: number = 0;
</script>

<div class="inline-block text-white text-center font-bold mt-2"
     style="
    background-color: #bbada0;
    padding: 15px 25px;
    border-radius: 3px;
    font-size: 25px;
    line-height: 47px;
  "
>
    <div style="line-height: 1;">{label}</div>
    <div style="line-height: 1;">{value}</div>
</div>