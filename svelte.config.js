import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$actions: './src/actions',
			$components: './src/components',
			$consts: './src/consts',
			$lib: './src/lib',
			$styles: './src/styles',
			$server: './src/server'
		}
	}
};

export default config;
