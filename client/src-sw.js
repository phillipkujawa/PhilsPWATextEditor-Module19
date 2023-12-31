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
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(
  // Cache CSS files.
  /.*\.css/,
  new CacheFirst({
      cacheName: 'css-cache',
  })
);

registerRoute(
  // Cache JS files.
  /.*\.js/,
  new CacheFirst({
      cacheName: 'js-cache',
  })
);

registerRoute(
  // Cache image files.
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  new CacheFirst({
      cacheName: 'image-cache',
      plugins: [
          new ExpirationPlugin({
              maxEntries: 20,
              maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for a week
          })
      ],
  })
);

