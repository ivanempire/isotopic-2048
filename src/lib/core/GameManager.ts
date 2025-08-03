import { tick } from "svelte";
import type { Isotope } from "$lib/core/Isotope";
import { gameState } from "$lib/stores/gameState.svelte";
import { Direction } from "$lib/core/Direction";

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
		this.createIsotopes(2);
		// this.createDebugGrid();
		this.notify();
		gameState.status = "PLAYING";
	}

	private createDebugGrid(): void {
		const masses = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];
		let index = 0;

		this.grid = Array.from({ length: this.height }, () =>
			Array.from({ length: this.width }, () => null)
		);

		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				if (index < masses.length) {
					const mass = masses[index++];
					this.grid[y][x] = {
						id: this.nextId++,
						mass,
						x,
						y,
						new: true
					};
				}
			}
		}

		this.notify();
	}

	private createIsotopes(isotopeCount: number = 1): void {
		const empty = this.getEmptyCells();
		if (empty.length === 0) return;

		for (let i = 0; i < isotopeCount; i++) {
			const index = Math.floor(Math.random() * empty.length);
			const { x, y } = empty.splice(index, 1)[0];

			const mass = Math.random() < 0.9 ? 2 : 4;

			this.grid[y][x] = {
				id: this.nextId++,
				mass,
				x,
				y,
				new: true
			};
		}
	}

	move(direction: Direction): void {
		let moved = false;

		// Figure out which way we're moving
		const isVertical = direction === Direction.Up || direction === Direction.Down;
		const isReverse = direction === Direction.Right || direction === Direction.Down;

		// Set up the limits
		const outerLimit = isVertical ? this.width : this.height;
		const innerLimit = isVertical ? this.height : this.width;

		for (let outer = 0; outer < outerLimit; outer++) {
			const line: (Isotope | null)[] = [];

			// Build set of isotopes on a per-line basis
			for (let inner = 0; inner < innerLimit; inner++) {
				const x = isVertical ? outer : isReverse ? this.width - 1 - inner : inner;
				const y = isVertical ? (isReverse ? this.height - 1 - inner : inner) : outer;
				const cell = this.grid[y][x];
				if (cell !== null) line.push(cell);
			}

			const newLine: (Isotope | null)[] = [];
			let i = 0;

			// Fuse isotopes on a per-line basis
			while (i < line.length) {
				const current = line[i];
				const next = line[i + 1];

				// Handle fusing two isotopes together
				if (next && current!.mass === next.mass) {
					const mergedMass = current!.mass * 2;
					const decayCount = this.getDecayCountForMass(mergedMass);

					const merged: Isotope = {
						id: this.nextId++,
						mass: mergedMass,
						x: isVertical
							? outer
							: isReverse
								? this.width - 1 - newLine.length
								: newLine.length,
						y: isVertical
							? isReverse
								? this.height - 1 - newLine.length
								: newLine.length
							: outer,
						new: true,
						radioactive: decayCount !== undefined,
						decayCount
					};
					newLine.push(merged);

					// const bonus = (currentUnstable > 0 ? currentUnstable * 2 : 0)
					//                 + (nextUnstable > 0 ? nextUnstable * 2 : 0);
					// this.score += newMass;
					i += 2;
					moved = true;
				} else {
					// This is just a moved isotope
					const movedTile: Isotope = {
						...current!,
						x: isVertical
							? outer
							: isReverse
								? this.width - 1 - newLine.length
								: newLine.length,
						y: isVertical
							? isReverse
								? this.height - 1 - newLine.length
								: newLine.length
							: outer
					};
					if (movedTile.x !== current!.x || movedTile.y !== current!.y) moved = true;
					newLine.push(movedTile);
					i += 1;
				}
			}

			// Fill empty spaces to maintain matrix
			while (newLine.length < innerLimit) {
				newLine.push(null);
			}

			// Add updated lines back into the grid
			for (let inner = 0; inner < innerLimit; inner++) {
				const x = isVertical ? outer : inner;
				const y = isVertical ? inner : outer;
				const index = isReverse ? innerLimit - 1 - inner : inner;
				this.grid[y][x] = newLine[index];
			}
		}

		if (moved) {
			// TODO: Order should be correct?
			this.decrementDecayCounters();
			this.createIsotopes();
			this.notify();
			// this.checkEnd();
		}
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

	private async notify(): void {
		// TODO: Sort of hacky for now, see if directly setting it will break reactivity or not
		const snapshot = this.grid.map((row) => row.map((cell) => (cell ? { ...cell } : null)));

		// const snapshot = this.grid.map((row) =>
		// 	row.map((cell) => {
		// 		if (!cell) return null;
		// 		const copy = { ...cell };
		// 		// Clear 'new' after animation trigger
		// 		if (copy.new) copy.new = false;
		// 		return copy;
		// 	})
		// );

		gameState.grid = snapshot;

		// self.score += merged.value + (tile.unstable > 0 ? tile.unstable * 2 : 0) + (next.unstable > 0 ? next.unstable * 2 : 0);
		const score = this.calculateScore();

		// TODO: Adjust
		gameState.currentScore = score;
		gameState.bestScore = score;

		// Wait for Svelte to flush DOM updates (including binding to grid)
		await tick();

		// Clear 'new' flags AFTER the DOM has rendered
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				const cell = this.grid[y][x];
				if (cell?.new) {
					cell.new = false;
				}
			}
		}
	}

	private calculateScore(): number {
		// TODO: Look up scoring policy
		return Math.floor(this.width / this.width);
	}

	private decrementDecayCounters(): void {
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				const cell = this.grid[y][x];
				if (cell?.radioactive && typeof cell.decayCount === "number") {
					cell.decayCount--;
					if (cell.decayCount <= 0) {
						this.grid[y][x] = null;
					}
				}
			}
		}
	}


	private getDecayCountForMass(mass: number): number | undefined {
		if (mass === 8 || mass === 32 || mass === 128 || mass > 256) {
			return mass <= 256 ? mass - mass / 4 : 81;
		}
		return undefined;
	}
}
