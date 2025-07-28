export class GameManager {
    width: number;
    height: number;
    isotopes: Isotope[] = [];
    private nextId = 0;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.reset();
    }

    reset() {
        this.isotopes = [];
        this.createInitialIsotopes();
    }

    createInitialIsotopes() {
        const empty = this.getEmptyCells();
        if (empty.length === 0) return;

        const spawnCount = Math.min(2, empty.length);
        const newIsotopes: Isotope[] = [];

        for (let i = 0; i < spawnCount; i++) {
            const index = Math.floor(Math.random() * empty.length);
            const { x, y } = empty.splice(index, 1)[0];

            const value = Math.random() < 0.9 ? 2 : 4;

            newIsotopes.push({
                id: this.nextId++,
                value,
                x,
                y,
                new: true
            });
        }

        this.isotopes.push(...newIsotopes);
    }

    getIsotopes(): Isotope[] {
        return this.isotopes;
    }

    private getEmptyCells(): { x: number; y: number }[] {
        const occupied = new Set(this.isotopes.map(t => `${t.x},${t.y}`));
        const empty: { x: number; y: number }[] = [];

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (!occupied.has(`${x},${y}`)) {
                    empty.push({ x, y });
                }
            }
        }

        return empty;
    }
}