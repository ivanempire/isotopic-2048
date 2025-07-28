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

	getIsotopes(): Isotope[] {
		return this.grid.flat().filter((iso): iso is Isotope => iso !== null);
	}

	moveUp(): void {
		console.log('Moving up');
	}

	moveDown(): void {
		console.log('Moving down');
	}

	moveLeft(): void {
		console.log('Moving left');
	}

	moveRight(): void {
		console.log('Moving right');
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
}
