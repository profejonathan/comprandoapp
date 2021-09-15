// Crear una version del cache
const CACHE_NAME = 'V1_cache_comprando';

urlsToCache = [
    './',
    './css/bootstrap.min.css',
    './js/bootstrap.min.js',
    './js/vue.js',
    './images/icon_32.png'
]


// 1. Estado: Instalacion, almacenar los archivo estaticos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(  cache => {
            return cache.addAll(urlsToCache)
        })
        .catch( err => {
            console.log('Error al Registrarse', err)
        })
    )
})

// 2. Estado Activo, Buscando los archivos del almacenado
self.addEventListener('active', event => {
    const cachelist = [ CACHE_NAME]

    event.waitUntil(
        caches.keys()
        .then( cachesNames => {
            cachesNames.map( cachesName => {
                // Removero lo que no se necesita en cache
                if ( cachelist.indexOf(cachesName) === -1){
                    return caches.delete(cachesName)
                }
            })
        })
        .then( () => self.clients.claim())
        .catch( err => {
            console.log('Error al Registrarse', err)
        })
    )

})


// Cuando necesite recuperar los archivos
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match( event.request)
        .then ( resp => {
            if ( resp ) {
                return resp
            }

            // Recuerar el actual
            return fetch(event.request)
        })
    )
})