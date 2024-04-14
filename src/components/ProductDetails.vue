<template>
    <div class="min-h-screen flex justify-center items-center">
        <div class="flex flex-col shadow-[0_0_6px_#CCCCCCBB] p-6 divide-y divide-blue-500">
            <h2>Name: {{ product.name }}</h2>
            <p>Description: {{ product.description }}</p>
            <p>Price: {{ product.price }}</p>
        </div>
    </div>
</template>

<script>
    import axios from '../axios';
    import { useRoute } from 'vue-router';

    export default {
        data() {

            return {
                product: {}
            }
        },
        mounted () {
            const route = useRoute();
            axios.get('/products/' + route.params.id)
               .then(response => {
                    this.product = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
</script>