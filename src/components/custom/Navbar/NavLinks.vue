<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const isAdminRoute = computed(() => {
  return route.path.includes('/admin');
});
</script>

<template>
  <div class="md:flex items-center gap-3 hidden text-xl">
    <router-link to="/" active-class="text-safariGreen">Home</router-link>
    <router-link to="/product" active-class="text-safariGreen">Products</router-link>
    <router-link to="/gallery" active-class="text-safariGreen">Gallery</router-link>
    <router-link to="/location" active-class="text-safariGreen">Location</router-link>
    <router-link to="/admin" :class="{ 'text-safariGreen': isAdminRoute }">Admin</router-link>
  </div>
</template>
