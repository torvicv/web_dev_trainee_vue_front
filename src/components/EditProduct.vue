<template>
  <div class="min-h-screen flex items-center justify-center">
    <form
      @submit.prevent="submitForm"
      class="shadow-[0_0_6px_#CCCCCCBB] gap-6 w-2/6 flex flex-col px-6 py-4 rounded"
    >
      <div class="flex justify-start w-full flex gap-4">
        <label for="name">Name</label>
        <input
          type="text"
          class="w-full focus:outline-none focus:ring-0 focus:border-0 border-b border-blue-600"
          id="name"
          name="name"
          placeholder="product name"
          v-model="product.name"
        />
      </div>
      <p v-if="errors.name" class="text-xs text-red-600">{{ errors.name }}</p>
      <div class="flex justify-start w-full flex gap-4">
        <label for="description">Description</label>
        <input
          type="text"
          class="w-full focus:outline-none focus:ring-0 focus:border-0 border-b border-blue-600"
          id="description"
          name="description"
          placeholder="description"
          v-model="product.description"
        />
      </div>
      <p v-if="errors.description" class="text-xs text-red-600">
        {{ errors.description }}
      </p>
      <div class="flex justify-start w-full flex gap-4">
        <label for="price">Price</label>
        <input
          type="number"
          step="0.05"
          class="w-full focus:outline-none focus:ring-0 focus:border-0 border-b border-blue-600"
          id="price"
          name="price"
          placeholder="price"
          v-model="product.price"
        />
      </div>
      <p v-if="errors.price" class="text-xs text-red-600">{{ errors.price }}</p>
      <div class="">
        <button type="submit" class="bg-blue-500 px-3 py-2 rounded">
          Update Product
        </button>
      </div>
    </form>
  </div>
</template>

<script>
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import axios from '../axios';

    export default {

        setup() {
            const product = ref({
                id: null,
                name: '',
                description: '',
                price: '',
            });

            const errors = ref({
                name: '',
                description: '',
                price: '',
            });

            const route = useRoute();
            product.value.id = route.params.id;

            const router = useRouter();

            const validateInput = () => {
                const errorMessages = {};
                if (!product.value.name) {
                    errorMessages.name = 'Name is required';
                }
                if (!product.value.description) {
                    errorMessages.description = 'Description is required';
                }
                if (!product.value.price) {
                    errorMessages.price = 'Price is required';
                }
                if (isNaN(product.value.price)) {
                    errorMessages.price = 'Price must be a number';
                }

                return errorMessages;
            };

            const submitForm = async () => {

                const errorMessages = validateInput();
                if (Object.keys(errorMessages).length > 0) {
                    errors.value = errorMessages;
                    return;
                }

                await axios.put(`/products/${product.value.id}`, product.value)
                 .then((response) => {
                      console.log(response);
                      router.push('/products');
                  })
                  .catch((error) => {
                     console.log(error);
                  });

            }

            onMounted(async () => {

                await axios.get(`/products/${product.value.id}`)
                 .then((response) => {
                      console.log(response);
                      product.value = response.data;
                  })
                  .catch((error) => {
                     console.log(error);
                  });
            });

            return { product, submitForm, errors };
        }
    }
</script>
