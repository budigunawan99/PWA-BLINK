const CACHE_NAME = "blink-v2.9";
var urlsToCache = [
      "/",
      "favicon.ico",
      "manifest.json",
      "apple-touch-icon.png",
      "logo.png",
      "android-chrome-192x192.png",
      "android-chrome-512x512.png",
      "index.html",
      "layouts/nav.html",
      "layouts/footer.html",
      "pages/home.html",
      "pages/about.html",
      "pages/creator.html",
      "pages/member.html",
      "css/materialize.min.css",
      "css/custom.css",
      "js/load_service_worker.js",
      "js/materialize.min.js",
      "js/custom.js",
      "iconfont/material-design-icons-3.0.2/iconfont/MaterialIcons-Regular.eot",
      "iconfont/material-design-icons-3.0.2/iconfont/MaterialIcons-Regular.woff2",
      "iconfont/material-design-icons-3.0.2/iconfont/MaterialIcons-Regular.woff",
      "iconfont/material-design-icons-3.0.2/iconfont/MaterialIcons-Regular.ttf",
      "img/logo.png",
      "img/gelombang3.png",
      "img/ice_cream.png",
      "img/group-bp.jpg",
      "img/budi.jpg",
      "img/jennie.jpg",
      "img/jisoo.jpg",
      "img/lisa.jpg",
      "img/rose.jpg"
];

self.addEventListener("install", function (event) {
      event.waitUntil(
            caches.open(CACHE_NAME).then(function (cache) {
                  return cache.addAll(urlsToCache);
            })
      );
});

self.addEventListener("fetch", function (event) {
      event.respondWith(
            caches
                  .match(event.request, { cacheName: CACHE_NAME })
                  .then(function (response) {
                        if (response) {
                              console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                              return response;
                        }

                        console.log(
                              "ServiceWorker: Memuat aset dari server: ",
                              event.request.url
                        );
                        return fetch(event.request);
                  })
      );
});

self.addEventListener("activate", function (event) {
      event.waitUntil(
            caches.keys().then(function (cacheNames) {
                  return Promise.all(
                        cacheNames.map(function (cacheName) {
                              if (cacheName != CACHE_NAME) {
                                    console.log("ServiceWorker: cache " + cacheName + " dihapus");
                                    return caches.delete(cacheName);
                              }
                        })
                  );
            })
      );
});