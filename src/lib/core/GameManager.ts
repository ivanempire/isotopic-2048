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
        // TODO: Can probably combine these
        this.spawnRandomIsotope();
        this.spawnRandomIsotope();
    }

    spawnRandomIsotope() {
        const empty = this.getEmptyCells();
        if (empty.length === 0) return;

        const { x, y } = empty[Math.floor(Math.random() * empty.length)];

        // TODO: Check what the original threshold is
        const value = Math.random() < 0.9 ? 2 : 4;

        console.log("What do we have? " + this.isotopes.length);
        console.dir(this.isotopes);
        this.isotopes.push({
            id: this.nextId++,
            value,
            x,
            y,
            new: true
        });
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