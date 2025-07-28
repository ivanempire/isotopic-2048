import type { GameManager } from '$lib/core/GameManager';

export class KeyInterceptor {
	private manager: GameManager;

	constructor(manager: GameManager) {
		this.manager = manager;
		this.handleKey = this.handleKey.bind(this);
		window.addEventListener('keydown', this.handleKey);
	}

	private handleKey(event: KeyboardEvent): void {
		switch (event.key) {
			case 'ArrowUp':
				this.manager.moveUp();
				break;
			case 'ArrowDown':
				this.manager.moveDown();
				break;
			case 'ArrowLeft':
				this.manager.moveLeft();
				break;
			case 'ArrowRight':
				this.manager.moveRight();
				break;
			default:
				return;
		}
		event.preventDefault();
	}

	// public destroy(): void {
	// 	window.removeEventListener("keydown", this.handleKey);
	// }
}
