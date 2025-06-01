import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ForgotPass from "@/views/ForgotPass.vue";
import Profile from "@/views/Profile.vue";
import Admin from "@/views/Admin.vue";
import CreateBlog from "@/views/CreateBlog.vue";
import BlogPreview from "@/views/BlogPreview.vue";
import ViewBlog from "@/views/ViewBlog.vue";
import Blogs from "@/views/Blogs.vue";
import CategoryView from "@/views/CategoryView.vue";
import EditBlog from "@/views/EditBlog.vue";
import store from "@/store/index.js";
import About from "@/views/About.vue";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const auth = getAuth()
const db   = getFirestore()


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Home',
            requiresAuth: false,
        },
    },
    {
        path: '/blogs',
        name: 'Blogs',
        component: Blogs,
        meta: {
            title: 'Blogs',
            requiresAuth: false,
        },
    },
    {
        path: '/create-post',
        name: 'CreatePost',
        component: CreateBlog,
        meta : {
            title: 'CreateBlog',
            requiresAuth: true,
            requiresAdmin: true,
        },
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta : {
            title: 'About',
            requiresAuth: false,
        },
    },
    {
        path: '/category/:name',
        name: 'Category',
        component: CategoryView,
        props: true,
        meta : {
            title: 'Category',
            requiresAuth: false,
        },
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta : {
            title: 'Profile',
            requiresAuth: true,
        },
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        meta : {
            title: 'admin',
            requiresAuth: true,
            requiresAdmin: true,
        },
    },
    {
        path: '/forgotPass',
        name: 'ForgotPass',
        component: ForgotPass,
        meta : {
            title: 'ForgotPassword',
            requiresAuth: false,
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta : {
            title: 'Login',
            requiresAuth: false,
        },
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta : {
            title: 'Register',
            requiresAuth: false,

        },
    },
    {
        path: '/blog-preview',
        name: 'BlogPreview',
        component: BlogPreview,
        meta : {
            title: 'BlogPreview',
            requiresAuth: true,
            requiresAdmin: true,
        },
    },
    {
        path: '/view-blog/:blogid',
        name: 'ViewBlog',
        component: ViewBlog,
        meta : {
            title: 'ViewBlog',
            requiresAuth: false,
        },
    },
    {
        path: '/edit-blog/:blogid',
        name: 'EditBlog',
        component: EditBlog,
        meta : {
            title: 'EditBlog',
            requiresAuth: true,
            requiresAdmin: true,
        },
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

function waitForAuthInitialization() {
    return new Promise((resolve) => {
        if (auth.currentUser !== null) {
            return resolve()
        }

        const unsubscribe = onAuthStateChanged(auth, () => {
            unsubscribe()
            resolve()
        })
    })
}

router.beforeEach(async (to, from, next) => {
    store.commit('setLoading', true)
    document.title = `BlogIT`;

    await waitForAuthInitialization()

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
    const user = auth.currentUser

    if (requiresAuth && !user) {
        store.commit('setLoading', false)
        return next({ name: 'Home' })
    }

    if (requiresAdmin) {
        if (!user) {
            store.commit('setLoading', false)
            return next({ name: 'Home' })
        }

        try {
            const docRef = doc(db, 'users', user.uid)
            const snap = await getDoc(docRef)
            const isAdmin = snap.exists() && snap.data().admin === true

            if (!isAdmin) {
                store.commit('setLoading', false)
                return next({ name: 'Home' })
            }
        } catch (err) {
            console.error('Error fetching admin flag:', err)
            store.commit('setLoading', false)
            return next({ name: 'Home' })
        }
    }

    return next()
})



router.afterEach(() => {
    setTimeout(() => store.commit('setLoading', false), 400)
})


export default router