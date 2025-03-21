<script setup>
import Navbar from './components/custom/Navbar/Navbar.vue';
import { RouterView } from 'vue-router';
import { Toaster } from 'vue-sonner'

</script>

<template>
  <Navbar />
  <Toaster position="top-center" />
  <RouterView />
</template>


