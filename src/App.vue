<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  name: 'App'
}
</script>

<template>
  <Navbar />

  <div id="app">
    <router-view />
  </div>
</template>
