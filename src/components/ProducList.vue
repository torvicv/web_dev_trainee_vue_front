<template>
    <div class="min-h-screen flex flex-col items-center justify-center gap-3 divide-y divide-gray">
        <div v-for="product in products" class="w-1/2">
          <div class="grid grid-cols-6">
            <h5 class="">{{ product.name }}</h5>
            <p class="">{{ product.description }}</p>
            <p class="">
              <small class="text-muted">Price: {{ product.price }}</small>
            </p>
            <a class="bg-blue-500 rounded py-2 text-white text-center" :href="'/edit-product/'+product.id">
                Edit
            </a>
            <a class="bg-blue-500 rounded py-2 text-white text-center" :href="'/product/'+product.id">
                Details
            </a>
            <button class="bg-red-600 rounded py-2 text-white" @click="deleteProduct(product.id)">
                Delete
            </button>
          </div>
        </div>
    </div>
</template>

<script>
import axios from "../axios";

export default {
  data() {
    return {
      products: [],
    };
  },
  async mounted() {
    await axios
      .get("/products")
      .then((response) => {
        this.products = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    async deleteProduct(id) {
      await axios.delete(`/products/${id}`);
      this.products = this.products.filter((product) => product.id !== id);
    },
  }
}
</script>
