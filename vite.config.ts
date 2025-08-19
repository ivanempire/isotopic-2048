import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";

export default defineConfig({
	server: {
		host: "0.0.0.0",
		port: 3000,
	},
	plugins: [
		tailwindcss(),
		sveltekit(),
		SvelteKitPWA({
			srcDir: "src",
			injectRegister: "auto",
			registerType: "autoUpdate",
			filename: "service-worker.ts",
			strategies: "injectManifest",
			manifest: {
				name: "Isotopic-2048",
				short_name: "Isotopic-2048",
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
			},
			includeAssets: [
				"apple-touch-icon.png",
				"favicon.svg",
				"isotopic-192.png",
				"isotopic-192-mask.png",
				"isotopic-512.png",
				"isotopic-512-mask.png"
			],
			workbox: {
				globPatterns: ["**/*.{js,css,html,png,svg,woff2}"],
			},
			injectManifest: {
				globPatterns: ["**/*.{js,css,html,png,svg,woff2}"],
			},
			devOptions: {
				enabled: true
			}
		})
	]
});
