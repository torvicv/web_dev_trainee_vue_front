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
          v-model="name"
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
          v-model="description"
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
          v-model="price"
        />
      </div>
      <p v-if="errors.price" class="text-xs text-red-600">{{ errors.price }}</p>
      <div class="">
        <button type="submit" class="bg-blue-500 px-3 py-2 rounded">
          Add Product
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "../axios";

export default {
  data() {
    return {
      name: "",
      description: "",
      price: "",
      errors: {},
    };
  },
  methods: {
    validateInput() {
      this.errors = {};

      if (!this.name) {
        this.errors.name = "Name is required";
      }

      if (!this.description) {
        this.errors.description = "Description is required";
      }

      if (!this.price) {
        this.errors.price = "Price is required";
      }

      if (isNaN(this.price)) {
        this.errors.price = "Price must be a positive number";
      }
      return this.errors;
    },
    async submitForm() {
      const errors = this.validateInput();
      if (Object.keys(errors).length > 0) {
        this.errors = errors;
        return;
      }
      try {
        await axios
          .post("/products", {
            name: this.name,
            description: this.description,
            price: this.price,
          })
          .then((response) => {
            this.name = "";
            this.description = "";
            this.price = "";
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
        this.$router.push("/");
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
