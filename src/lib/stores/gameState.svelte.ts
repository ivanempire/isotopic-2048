import type { GameState } from "$lib/core/GameState";

const initialGameState: GameState = {
	status: "PLAYING",
	grid: [],
	currentScore: 0,
	bestScore: 0
};

export const gameState = $state<GameState>(initialGameState);
