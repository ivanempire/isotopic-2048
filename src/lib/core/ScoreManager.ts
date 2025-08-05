import { gameState } from "$lib/stores/gameState.svelte";

export class ScoreManager {
	private static readonly BEST_SCORE_KEY = "isotopic.bestScore";

	constructor() {
		this.loadBestScore();
	}

	private loadBestScore(): void {
		const stored = localStorage.getItem(ScoreManager.BEST_SCORE_KEY);
		const parsed = stored !== null ? parseInt(stored, 10) : NaN;
		gameState.bestScore = isNaN(parsed) ? 0 : parsed;
	}

	private saveBestScore(score: number): void {
		localStorage.setItem(ScoreManager.BEST_SCORE_KEY, score.toString());
	}

	updateScore(delta: number): void {
		gameState.currentScore += delta;

		if (gameState.currentScore > gameState.bestScore) {
			gameState.bestScore = gameState.currentScore;
			this.saveBestScore(gameState.currentScore);
		}
	}
}
