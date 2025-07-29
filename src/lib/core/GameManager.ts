import type { Isotope } from "$lib/core/Isotope";
import { gameState } from "$lib/stores/gameState.svelte";

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
		this.createInitialPair();
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
						y
					};
				}
			}
		}

		this.notify();
	}

	private createSingleIsotope(): void {
		const empty = this.getEmptyCells();
		if (empty.length === 0) return;

		const index = Math.floor(Math.random() * empty.length);
		const { x, y } = empty.splice(index, 1)[0];

		const mass = Math.random() < 0.9 ? 2 : 4;

		this.grid[y][x] = {
			id: this.nextId++,
			mass,
			x,
			y
		};
	}

	private createInitialPair(): void {
		const empty = this.getEmptyCells();
		if (empty.length === 0) return;

		const spawnCount = Math.min(2, empty.length);

		for (let i = 0; i < spawnCount; i++) {
			const index = Math.floor(Math.random() * empty.length);
			const { x, y } = empty.splice(index, 1)[0];

			const mass = Math.random() < 0.9 ? 2 : 4;

			this.grid[y][x] = {
				id: this.nextId++,
				mass,
				x,
				y
			};
		}
	}

	moveUp(): void {
		let moved = false;

		for (let x = 0; x < this.width; x++) {
			const column: (Isotope | null)[] = [];
			for (let y = 0; y < this.height; y++) {
				if (this.grid[y][x] !== null) {
					column.push(this.grid[y][x]);
				}
			}

			const newColumn: (Isotope | null)[] = [];
			let y = 0;

			while (y < column.length) {
				const current = column[y];
				const next = column[y + 1];

				if (next && current!.mass === next.mass) {
					// Merge
					const merged: Isotope = {
						id: this.nextId++,
						mass: current!.mass * 2,
						x,
						y: newColumn.length
					};
					newColumn.push(merged);
					y += 2;
					moved = true;
				} else {
					// Slide
					const movedTile: Isotope = {
						...current!,
						x,
						y: newColumn.length
					};
					if (movedTile.y !== current!.y) moved = true;
					newColumn.push(movedTile);
					y += 1;
				}
			}

			// Fill remainder with nulls
			while (newColumn.length < this.height) {
				newColumn.push(null);
			}

			for (let y = 0; y < this.height; y++) {
				this.grid[y][x] = newColumn[y];
			}
		}

		if (moved) {
			this.createSingleIsotope();
			this.notify();
			// this.checkEnd();
		}
	}

	moveDown(): void {
		let moved = false;

		for (let x = 0; x < this.width; x++) {
			const column: (Isotope | null)[] = [];
			for (let y = this.height - 1; y >= 0; y--) {
				if (this.grid[y][x] !== null) {
					column.push(this.grid[y][x]);
				}
			}

			const newColumn: (Isotope | null)[] = [];
			let i = 0;

			while (i < column.length) {
				const current = column[i];
				const next = column[i + 1];

				if (next && current!.mass === next.mass) {
					// Merge
					const merged: Isotope = {
						id: this.nextId++,
						mass: current!.mass * 2,
						x,
						y: this.height - 1 - newColumn.length
					};
					newColumn.push(merged);
					i += 2;
					moved = true;
				} else {
					// Slide
					const movedTile: Isotope = {
						...current!,
						x,
						y: this.height - 1 - newColumn.length
					};
					if (movedTile.y !== current!.y) moved = true;
					newColumn.push(movedTile);
					i += 1;
				}
			}

			// Fill remainder with nulls
			while (newColumn.length < this.height) {
				newColumn.push(null);
			}

			for (let y = 0; y < this.height; y++) {
				this.grid[y][x] = newColumn[this.height - 1 - y];
			}
		}

		if (moved) {
			this.createSingleIsotope();
			this.notify();
			// this.checkEnd();
		}
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

				if (next && current.mass === next.mass) {
					// Merge
					const merged: Isotope = {
						id: this.nextId++,
						mass: current.mass * 2,
						x: newRow.length,
						y
					};
					newRow.push(merged);
					x += 2;
					moved = true;
				} else {
					// Slide
					const movedTile: Isotope = {
						...current,
						x: newRow.length,
						y
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
			this.createSingleIsotope();
			this.notify();
			// this.checkEnd();
		}
	}

	moveRight(): void {
		let moved = false;

		for (let y = 0; y < this.height; y++) {
			const originalRow = this.grid[y];
			const filtered = originalRow.filter((cell): cell is Isotope => cell !== null).reverse();

			const newRow: (Isotope | null)[] = [];
			let i = 0;

			while (i < filtered.length) {
				const current = filtered[i];
				const next = filtered[i + 1];

				if (next && current.mass === next.mass) {
					// Merge
					const merged: Isotope = {
						id: this.nextId++,
						mass: current.mass * 2,
						x: this.width - 1 - newRow.length,
						y
					};
					newRow.push(merged);
					i += 2;
					moved = true;
				} else {
					// Slide
					const movedTile: Isotope = {
						...current,
						x: this.width - 1 - newRow.length,
						y
					};
					if (movedTile.x !== current.x) moved = true;
					newRow.push(movedTile);
					i += 1;
				}
			}

			// Fill remainder with nulls
			while (newRow.length < this.width) {
				newRow.push(null);
			}

			this.grid[y] = newRow.reverse();
		}

		if (moved) {
			this.createInitialPair();
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

	private notify(): void {
		// TODO: Sort of hacky for now, see if directly setting it will break reactivity or not
		const snapshot = this.grid.map((row) => row.map((cell) => (cell ? { ...cell } : null)));

		gameState.grid = snapshot;

		const score = this.calculateScore();

		// TODO: Adjust
		gameState.currentScore = score;
		gameState.bestScore = score;
	}

	private calculateScore(): number {
		// TODO: Look up scoring policy
		return Math.floor(this.width / this.width);
	}
}
