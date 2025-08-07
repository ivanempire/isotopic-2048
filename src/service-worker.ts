import { clientsClaim } from "workbox-core";
import { registerRoute } from "workbox-routing";
import { ExpirationPlugin } from "workbox-expiration";
import { StaleWhileRevalidate } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";

self.addEventListener("install", () => {
	self.skipWaiting();
});

clientsClaim();
cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
	/^https:\/\/fonts\.googleapis\.com/,
	new StaleWhileRevalidate({
		cacheName: "google-fonts-stylesheets",
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200]
			}),
			new ExpirationPlugin({
				maxEntries: 10
			})
		]
	}),
	"GET"
);
