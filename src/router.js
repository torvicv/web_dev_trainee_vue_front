import { createRouter, createWebHistory } from 'vue-router';

import Login from './components/Login.vue';
import Register from './components/Register.vue';
import AddProduct from './components/AddProduct.vue';
import ProducList from './components/ProducList.vue';
import EditProduct from './components/EditProduct.vue';
import ProductDetails from './components/ProductDetails.vue';

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
    },
    {
        path: '/add-product',
        name: 'AddProduct',
        meta: {public: false},
        component: AddProduct
    },
    {
        path: '/products',
        name: 'ProductList',
        meta: {public: false},
        component: ProducList
    },
    {
        path: '/edit-product/:id',
        name: 'EditProduct',
        meta: {public: false},
        component: EditProduct
    },
    {
        path: '/product/:id',
        name: 'ProductDetails',
        meta: {public: false},
        component: ProductDetails
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

