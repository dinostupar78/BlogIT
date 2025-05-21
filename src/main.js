import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from './firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

let app;
onAuthStateChanged(auth, () => {
    if (!app) {
        app = createApp(App)
        app.use(router)
        app.mount('#app')
    }
})


