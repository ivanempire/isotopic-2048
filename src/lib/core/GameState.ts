import type { Isotope } from "$lib/core/Isotope";

export type GameStatus = "PLAYING" | "WIN" | "LOSS";

export interface GameState {
	status: GameStatus;
	grid: (Isotope | null)[][];
	currentScore: number;
	bestScore: number;
}
