<template>
    <nav class="flex gap-2 w-full justify-end">
        <div class="flex w-fit gap-4">
            <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
            <router-link to="/register" v-if="!isLoggedIn">Register</router-link>
            <router-link to="/add-product" v-if="isLoggedIn">Add Product</router-link>
            <router-link to="/products" v-if="isLoggedIn">Products</router-link>
            <a href="#" @click="logout" v-if="isLoggedIn">Logout</a>
        </div>
    </nav>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        computed: {
            ...mapState(['isLoggedIn'])
        },
        methods: {
           ...mapActions(['logout'])
        }
    }


</script>
