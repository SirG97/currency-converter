 const cacheName = 'currency-converter-v1'
self.addEventListener('install', event => {

    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                '/currency-converter/',
                '/currency-converter/index.html',
                '/currency-converter/css/w3.css',
                '/currency-converter/css/style.css',
                '/currency-converter/app.js',
            ]);
        })
    );
});

self.addEventListener('activate', event =>{
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if(key !== cacheName){
                    console.log('removing old cache');
                    return caches.delete(key);
                }
            }))
        })
    );
})


self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then( response => {
            return response || fetch(event.request).then(response => {
                caches.open(cacheName).then(cache => {
                    cache.put(event.request, response.clone());
                    return response;
                })
 
            });
        })
    );
})