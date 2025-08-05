<script lang="ts">
	export let bestScore: number = 0;
	export let currentScore: number = 0;
</script>

<div class="scoreboard">
	<div class="score-box">
		<div class="label">Score</div>
		<div class="value">{currentScore}</div>
	</div>
	<div class="score-box">
		<div class="label">Best</div>
		<div class="value">{bestScore}</div>
	</div>
</div>

<style>
	.scoreboard {
		gap: 10px;
		color: white;
		display: flex;
		width: fit-content;
		flex-direction: row;
		margin-bottom: 15px;
	}

	.score-box {
		background-color: #bbada0;
		padding: 10px 20px;
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		align-items: center;
		white-space: nowrap;
		width: fit-content;
	}

	.label {
		opacity: 0.85;
		font-size: 14px;
		font-weight: bold;
	}

	.value {
		font-size: 24px;
		font-weight: bold;
		line-height: 1.2;
	}
</style>
