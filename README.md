<div align="center">
  <img src="https://github.com/ivanempire/isotopic-2048/blob/main/hero.png" alt="Isotopic-2048 hero" />
  <h1>Isotopic-2048</h1>

  <i>A modern, PWA (Progressive Web App) version of 2048. Can be installed through the browser and works offline.</i>
</div>

## Getting started
If you'd like to simply play the game, the latest deployment can always be found [here](https://isotopic-2048.vercel.app/). If you'd like to tinker with this project locally, then:
```bash
git clone git@github.com:ivanempire/isotopic-2048.git
cd isotopic-2048
pnpm install
pnpm run dev
```

### Code structure
This is a pretty typical Svelte 5 + SvelteKit project, and most of the interesting stuff lies in the [lib](src/lib) directory:

- **[GameManager](src/lib/core/GameManager.ts)** - instantiated when the application starts. This class seeds the game board with the initial isotopes and handles all interactions after a user has moved. The global game state is also updated from here.
- **[KeyInterceptor](src/lib/core/KeyInterceptor.ts)]** - handles the arrow and WASD key handling. Passes events into the `GameManager`.
- **[SwipeInterceptor](src/lib/core/SwipeInterceptor.ts)]** - same as above, but handles swipe gestures on mobile.
- **[ScoreManager](src/lib/core/ScoreManager.ts)** - keeps track of the current and best scores. Uses `localStorage` to persist this information across games.
- **[GameState](src/lib/core/GameState.ts)** - stores all information relevant to the current game's state.
- **[Direction](src/lib/core/Direction.ts)**, **[Isotope](src/lib/core/Isotope.ts)**, **[IsotopeStyling](src/lib/core/IsotopeStyling.ts)** - various data models and helpers needed to make this game go.

## Acknowledgements
The original idea for this concept belongs to [James Donnelly](https://jamesmdonnelly.com/), and their deployment can be found [here](https://jamesmdonnelly.com/Isotopic256/). Original 2048 game idea by [Gabriele Cirulli](https://www.linkedin.com/in/gabrielecirulli/).
