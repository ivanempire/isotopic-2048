/// <reference types="@sveltejs/kit" />
import { build, files, version } from "$service-worker";
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
const CACHE = `game-pwa-${version}`;

// Only have one URL
const START_URL = "/";
const OFFLINE_URL = START_URL;
const PRECACHE_URLS = [START_URL, ...build, ...files];

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

console.log("Is this empty? ", build);

self.addEventListener("install", (event) => {
	console.log("SW: install");
	self.skipWaiting();

	event.waitUntil(
		caches.open(CACHE).then((cache) =>
			Promise.all(
				PRECACHE_URLS.map((url) => {
						console.log("Adding to cache: ", url);
						cache.add(url).catch((err) => {
							console.log("SW precache error:", String(err), url);
						})
				}
				)
			)
		)
	);
});

self.addEventListener("activate", (event) => {
	console.log("SW: activate");
	event.waitUntil(
		caches.keys().then((keys) =>
			Promise.all(
				keys.map((key) => {
					if (key !== CACHE) {
						console.log("SW: removing old cache", key);
						return caches.delete(key);
					}
				})
			)
		)
	);
	self.clients.claim();
});

self.addEventListener("fetch", (event) => {
	const req = event.request;

	const url = new URL(req.url);
	if (url.origin !== self.location.origin) return;
	if (!/^(http|https):\/\//i.test(req.url)) return;

	if (req.method !== "GET") {
		event.respondWith(fetch(req).catch(() => caches.match(OFFLINE_URL)));
		return;
	}

	if (req.mode === "navigate") {
		event.respondWith(networkFirst(req));
		return;
	}

	event.respondWith(cacheFirst(req));
});

async function networkFirst(req: Request): Promise<Response> {
	try {
		const res = await fetch(req);
		const cache = await caches.open(CACHE);
		cache.put(req, res.clone());
		return res;
	} catch {
		const cached = await caches.match(req);
		if (cached) return cached;

		const shell = await caches.match(OFFLINE_URL);
		if (shell) return shell;

		throw new Error("Offline and no cache available");
	}
}

async function cacheFirst(req: Request): Promise<Response> {
	const cached = await caches.match(req);
	if (cached) return cached;

	try {
		const res = await fetch(req);
		const cache = await caches.open(CACHE);
		cache.put(req, res.clone());
		return res;
	} catch {
		const shell = await caches.match(OFFLINE_URL);
		if (shell) return shell;
		throw new Error("Offline and no cache available");
	}
}