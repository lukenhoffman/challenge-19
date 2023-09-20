const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache assets based on Workbox configuration
precacheAndRoute(self.__WB_MANIFEST);

// Cache for pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,  // 30 days
    }),
  ],
});

// Warm up the page cache with key routes
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Register page cache strategy for navigation requests
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Cache for assets (styles, scripts, images, etc.)
const assetCache = new CacheFirst({
  cacheName: 'asset-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 60 * 60 * 24 * 365,  // 1 year
      maxEntries: 50,                     // Max number of cached assets
      purgeOnQuotaError: true,            // Cleanup if quota is exceeded
    }),
  ],
});

// Cache styles and scripts
registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script',
  assetCache
);

// Cache images
registerRoute(
  ({ request }) => request.destination === 'image',
  assetCache
);

// Cache fonts
registerRoute(
  ({ request }) => request.destination === 'font',
  assetCache
);


