import type { Isotope } from "$lib/core/Isotope";
import {
	setGrid,
	setStatus,
	updateCurrentScore,
	updateBestScore
} from "$lib/stores/gameStateStore";

export class GameManager {
	width: number;
	height: number;
	private grid: (Isotope | null)[][] = [];
	private nextId = 0;

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
		this.reset();
	}

	reset() {
		this.grid = Array.from({ length: this.height }, () =>
			Array.from({ length: this.width }, () => null)
		);
		this.nextId = 0;
		this.createInitialIsotopes();
		this.notify();
		setStatus("PLAYING");
	}

	private createInitialIsotopes(): void {
		const empty = this.getEmptyCells();
		if (empty.length === 0) return;

		const spawnCount = Math.min(2, empty.length);

		for (let i = 0; i < spawnCount; i++) {
			const index = Math.floor(Math.random() * empty.length);
			const { x, y } = empty.splice(index, 1)[0];

			const value = Math.random() < 0.9 ? 2 : 4;

			this.grid[y][x] = {
				id: this.nextId++,
				value,
				x,
				y,
				new: true
			};
		}
	}

	moveUp(): void {
		console.log("Moving up");
	}

	moveDown(): void {
		console.log("Moving down");
	}

	moveLeft(): void {
		let moved = false;

		for (let y = 0; y < this.height; y++) {
			const originalRow = this.grid[y];
			const filtered = originalRow.filter((cell): cell is Isotope => cell !== null);

			const newRow: (Isotope | null)[] = [];
			let x = 0;

			while (x < filtered.length) {
				const current = filtered[x];
				const next = filtered[x + 1];

				if (next && current.value === next.value) {
					// Merge
					const merged: Isotope = {
						id: this.nextId++,
						value: current.value * 2,
						x: newRow.length,
						y,
						new: false
					};
					newRow.push(merged);
					x += 2;
					moved = true;
				} else {
					// Slide
					const movedTile: Isotope = {
						...current,
						x: newRow.length,
						y,
						new: false
					};
					if (movedTile.x !== current.x) moved = true;
					newRow.push(movedTile);
					x += 1;
				}
			}

			// Fill remainder with nulls
			while (newRow.length < this.width) {
				newRow.push(null);
			}

			this.grid[y] = newRow;
		}

		if (moved) {
			this.createInitialIsotopes();
			this.notify();
			// this.checkEnd();
		}
	}

	moveRight(): void {
		console.log("Moving right");
	}

	private getEmptyCells(): { x: number; y: number }[] {
		const empty: { x: number; y: number }[] = [];

		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				if (this.grid[y][x] === null) {
					empty.push({ x, y });
				}
			}
		}

		return empty;
	}

	private notify(): void {
		// TODO: Sort of hacky for now, see if directly setting it will break reactivity or not
		const snapshot = this.grid.map((row) => row.map((cell) => (cell ? { ...cell } : null)));

		setGrid(snapshot);

		const score = this.calculateScore();
		updateCurrentScore(score);
		updateBestScore(score);
	}

	private calculateScore(): number {
		// TODO: Look up scoring policy
		return Math.floor(this.width / this.width);
	}
}
