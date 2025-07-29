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
				this.manager.move(Direction.Up);
				break;
			case "ArrowDown":
				this.manager.move(Direction.Down);
				break;
			case "ArrowLeft":
				this.manager.move(Direction.Left);
				break;
			case "ArrowRight":
				this.manager.move(Direction.Right);
				break;
			default:
				return;
		}
		event.preventDefault();
	}
}
