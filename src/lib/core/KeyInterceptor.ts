import { Direction } from "$lib/core/Direction";
import type { GameManager } from "$lib/core/GameManager";

export class KeyInterceptor {
	private manager: GameManager;

	constructor(manager: GameManager) {
		this.manager = manager;
		this.handleKey = this.handleKey.bind(this);
		window.addEventListener("keydown", this.handleKey);
	}

	private handleKey(event: KeyboardEvent): void {
		switch (event.key) {
			case "ArrowUp":
			case "w":
			case "W":
				this.manager.move(Direction.Up);
				break;
			case "ArrowDown":
			case "s":
			case "S":
				this.manager.move(Direction.Down);
				break;
			case "ArrowLeft":
			case "a":
			case "A":
				this.manager.move(Direction.Left);
				break;
			case "ArrowRight":
			case "d":
			case "D":
				this.manager.move(Direction.Right);
				break;
			default:
				return;
		}
		event.preventDefault();
	}
}
