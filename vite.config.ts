import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		SvelteKitPWA({
			strategies: "generateSW",
			selfDestroying: true,
			manifest: {
				short_name: "Isotopic-2048",
				name: "A radioactive version of 2048",
				start_url: "/",
				scope: "/",
				display: "standalone",
				theme_color: "#FAF8EF",
				background_color: "#FAF8EF",
				icons: [
					{
						src: "/pwa-192x192.png",
						sizes: "192x192",
						type: "image/png"
					},
					{
						src: "/pwa-512x512.png",
						sizes: "512x512",
						type: "image/png"
					},
					{
						src: "/pwa-maskable-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "maskable"
					},
					{
						src: "/pwa-maskable-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable"
					}
				]
			}
		})
	]
});
