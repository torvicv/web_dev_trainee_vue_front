import { createRouter, createWebHistory } from 'vue-router';

import Login from './components/Login.vue';
import Register from './components/Register.vue';

const routes = [
    {
        path: '/login',
        name: 'Login',
        meta: {public: true},
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        meta: {public: true},
        component: Register
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (!to.meta.public && !isAuthenticated) {
        next({name: 'Login'});
    } else {
        next();
    }
});

export default router;

