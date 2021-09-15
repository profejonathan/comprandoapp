if('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('/sw.js')
             .then(function() { console.log("Service Worker Registrado")})
             .catch( err => console.error('Error al registrar el SW', err))
             
  }