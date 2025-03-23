<script setup>
import { defineProps } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter()

let props = defineProps({
    searches: Object
})

</script>

<template>
    <div class="p-2 w-full h-full bg-gray-200 dark:bg-gray-700 rounded-md">
    <h1 class="text-2xl font-bold text-gray-700 dark:text-gray-400">10 Most Recent Searches</h1>

    <div v-for="item in searches?.slice(0, 10)" :key="item._id">
    <RouterLink :to="`/admin/search-details/${item._id}`" :key="item._id" class="flex items-center justify-between gap-2 bg-white dark:bg-gray-800 p-2 rounded-md my-1 cursor-pointer hover:bg-white/60 dark:hover:bg-gray-900 transition duration-300">
        <h1>"{{item.term}}"</h1>
        <span class="text-gray-400 line-clamp-1 italic text-xs">{{new Date(item.createdAt).toLocaleString()}}</span>
        <h1>{{item.resultsCount}} results</h1>
    </RouterLink>
    </div>
    
    <button aria-label="View all searches" @click="()=> router.push('/admin/all-searches')" class="bg-safariGreen dark:bg-safariGreenHover text-white w-full mt-1 font-bold p-2 rounded-md">View All Searches</button>
</div>
</template>