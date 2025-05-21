import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ForgotPass from "@/views/ForgotPass.vue";

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

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | BlogIT`;
    next();
})

export default router