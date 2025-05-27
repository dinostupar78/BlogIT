import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from './firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import store from './store'
import QuillEditor from 'vue3-quill';


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

let app;
onAuthStateChanged(auth, () => {
    if (!app) {
        app = createApp(App)
        app.component('QuillEditor', QuillEditor)
        app.use(router)
        app.use(store)

        app.mount('#app')
    }
})


