import { Direction } from "$lib/core/Direction";
import type { GameManager } from "$lib/core/GameManager";

export class SwipeInterceptor {
	private manager: GameManager;
	private touchStartX: number = 0;
	private touchStartY: number = 0;
	private readonly minSwipeDistance: number = 30;

	constructor(manager: GameManager, gridElement: HTMLElement) {
		this.manager = manager;
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);

		gridElement.addEventListener("touchstart", this.handleTouchStart, { passive: false });
		gridElement.addEventListener("touchend", this.handleTouchEnd, { passive: false });
	}

	private handleTouchStart(event: TouchEvent): void {
		if (event.touches.length !== 1) return;
		event.preventDefault();
		const touch = event.touches[0];
		this.touchStartX = touch.clientX;
		this.touchStartY = touch.clientY;
	}

	private handleTouchEnd(event: TouchEvent): void {
		if (event.changedTouches.length !== 1) return;
		const touch = event.changedTouches[0];
		const deltaX = touch.clientX - this.touchStartX;
		const deltaY = touch.clientY - this.touchStartY;

		if (Math.abs(deltaX) < this.minSwipeDistance && Math.abs(deltaY) < this.minSwipeDistance) {
			return;
		}

		if (Math.abs(deltaX) > Math.abs(deltaY)) {
			if (deltaX > 0) {
				this.manager.move(Direction.Right);
			} else {
				this.manager.move(Direction.Left);
			}
		} else {
			if (deltaY > 0) {
				this.manager.move(Direction.Down);
			} else {
				this.manager.move(Direction.Up);
			}
		}

		event.preventDefault();
	}
}
