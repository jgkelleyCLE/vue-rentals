<script setup>
import Navbar from './components/custom/Navbar/Navbar.vue';
import { RouterView } from 'vue-router';
import { Toaster } from 'vue-sonner'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

</script>

<template>
  <Navbar />
  <VueQueryDevtools />
  <Toaster position="top-center" />
  <RouterView />
</template>


