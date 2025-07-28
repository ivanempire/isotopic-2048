import { writable } from "svelte/store";
import type { Isotope } from "$lib/core/Isotope";
import type { GameState, GameStatus } from "$lib/core/GameState";

const initialGameState: GameState = {
	status: "PLAYING",
	grid: [],
	currentScore: 0,
	bestScore: 0
};

export const gameStore = writable<GameState>(initialGameState);

export function resetGame(): void {
	gameStore.set(initialGameState);
}

export function updateCurrentScore(newScore: number): void {
	console.log("Updating score with current score", newScore);
	gameStore.update((state) => ({
		...state,
		currentScore: newScore
	}));
}

export function updateBestScore(score: number): void {
	gameStore.update((state) => ({
		...state,
		bestScore: Math.max(state.bestScore, score)
	}));
}

export function setGrid(newGrid: (Isotope | null)[][]): void {
	gameStore.update((state) => ({
		...state,
		grid: newGrid
	}));
}

export function setStatus(newStatus: GameStatus): void {
	gameStore.update((state) => ({
		...state,
		status: newStatus
	}));
}
