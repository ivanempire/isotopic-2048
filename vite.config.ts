import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), SvelteKitPWA()]
});

//export default defineConfig({
//   plugins: [
//     VitePWA({
//       includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
//       manifest: {
//         name: 'My Awesome App',
//         short_name: 'MyApp',
//         description: 'My Awesome App description',
//         theme_color: '#ffffff',
//         icons: [
//           {
//             src: 'pwa-192x192.png',
//             sizes: '192x192',
//             type: 'image/png'
//           },
//           {
//             src: 'pwa-512x512.png',
//             sizes: '512x512',
//             type: 'image/png'
//           }
//         ]
//       }
//     })
//   ]
// })
