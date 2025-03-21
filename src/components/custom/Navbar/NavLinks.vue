<script setup>
import { useRoute } from 'vue-router';


const route = useRoute()

const isActive = (path) => {
    return route.path === path
}

</script>

<template>
    <div class="md:flex items-center gap-3 hidden text-xl">
    <router-link to="/" active-class="text-safariGreen" >Home</router-link>
        <router-link to="/product" active-class="text-safariGreen" >Products</router-link>
        <router-link to="/gallery" active-class="text-safariGreen" >Gallery</router-link>
        <router-link to="/location" active-class="text-safariGreen">Location</router-link>
        <router-link to="/admin" active-class="text-safariGreen">Admin</router-link>
</div>
</template>