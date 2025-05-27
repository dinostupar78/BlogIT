import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ForgotPass from "@/views/ForgotPass.vue";
import Profile from "@/views/Profile.vue";
import Admin from "@/views/Admin.vue";
import CreatePost from "@/views/CreatePost.vue";


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
        path: '/createPost',
        name: 'CreatePost',
        component: CreatePost,
        meta : {
            title: 'CreatePost',
        },
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


router.beforeEach((to, from, next) => {

    document.title = `PWA`;
    next();
})

export default router