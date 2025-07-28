<script lang="ts">
	export let label: string = "Score";
	export let value: number = 0;
</script>

<div
	class="mt-2 inline-block text-center font-bold text-white"
	style="
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #bbada0;
    padding: 15px 25px;
    border-radius: 3px;
    font-size: 25px;
    line-height: 1.2;
  "
>
	<!--    .score-container:after, .best-container:after {-->
	<!--    position: absolute; TODO: This needs to be the label -->
	<!--    width: 100%;-->
	<!--    top: 10px;-->
	<!--    left: 0;-->
	<!--    text-transform: uppercase;-->
	<!--    font-size: 13px;-->
	<!--    line-height: 13px;-->
	<!--    text-align: center;-->
	<!--    color: #eee4da;-->
	<!--}-->
	<div style="line-height: 1;">{label}</div>
	<div style="line-height: 1;">{value}</div>
</div>
