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
						src: "/isotopic-192.png",
						sizes: "192x192",
						type: "image/png"
					},
					{
						src: "/isotopic-192-mask.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "maskable"
					},
					{
						src: "/isotopic-512.png",
						sizes: "512x512",
						type: "image/png"
					},
					{
						src: "/isotopic-512-mask.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable"
					}
				]
			}
		})
	]
});
