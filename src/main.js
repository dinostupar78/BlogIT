import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from './firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import store from './store'
import Loading from '@/components/Loading.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faUserShield, faRightToBracket  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import QuillEditor from 'vue3-quill'
import Quill from 'quill'


import ResizeModule from 'quill-resize-image'
import ImageUploader from 'quill-image-uploader'

Quill.register('modules/resize', ResizeModule)
Quill.register('modules/imageUploader', ImageUploader)

library.add(faUser, faUserShield, faRightToBracket )


let app;
onAuthStateChanged(auth, () => {
    if (!app) {
        app = createApp(App)
        app.component('Loading', Loading)
        app.component('QuillEditor', QuillEditor)
        app.component('font-awesome-icon', FontAwesomeIcon)
        app.use(router)
        app.use(store)
        app.mount('#app')
    }
})


