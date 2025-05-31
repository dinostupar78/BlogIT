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



const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Home',
        },
    },
    {
        path: '/blogs',
        name: 'Blogs',
        component: Blogs,
        meta: {
            title: 'Blogs',
        },
    },
    {
        path: '/category/:name',
        name: 'Category',
        component: CategoryView,
        props: true
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta : {
            title: 'Profile',
        },
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        meta : {
            title: 'admin',
        },
    },
    {
        path: '/forgotPass',
        name: 'ForgotPass',
        component: ForgotPass,
        meta : {
            title: 'ForgotPassword',
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta : {
            title: 'Login',
        },
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta : {
            title: 'Register',
        },
    },
    {
        path: '/create-post',
        name: 'CreatePost',
        component: CreateBlog,
        meta : {
            title: 'CreateBlog',
        },
    },
    {
        path: '/blog-preview',
        name: 'BlogPreview',
        component: BlogPreview,
        meta : {
            title: 'BlogPreview',
        },
    },
    {
        path: '/view-blog/:blogid',
        name: 'ViewBlog',
        component: ViewBlog,
        meta : {
            title: 'ViewBlog',
        },
    },
    {
        path: '/edit-blog/:blogid',
        name: 'EditBlog',
        component: EditBlog,
        meta : {
            title: 'EditBlog',
        },
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


router.beforeEach((to, from, next) => {
    store.commit('setLoading', true)
    document.title = to.meta.title || 'PWA'

    next()
})

router.afterEach(() => {
    setTimeout(() => store.commit('setLoading', false), 400)
})



export default router