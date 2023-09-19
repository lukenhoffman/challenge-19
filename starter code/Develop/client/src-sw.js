const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

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

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Implement asset caching
const assetCache = new CacheFirst({
  cacheName: 'asset-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 60 * 60 * 24 * 365,  // 1 year
      maxEntries: 50,                     // Max number of cached assets
      purgeOnQuotaError: true,            // Automatically cleanup if quota is exceeded
    }),
  ],
});

// Cache stylesheets and scripts
registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script',
  assetCache
);

// Cache images
registerRoute(
  ({ request }) => request.destination === 'image',
  assetCache
);

// Additional assets like fonts can be added similarly
