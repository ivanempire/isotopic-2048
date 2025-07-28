// @ts-check
import AstroPWA from "@vite-pwa/astro"
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [AstroPWA(), svelte()],

  vite: {
    plugins: [tailwindcss()]
  }
});