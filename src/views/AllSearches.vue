<script setup>
import { useQuery } from '@tanstack/vue-query';
import { RouterLink } from 'vue-router';



const { data: searches } = useQuery({
    queryKey: ['searches'],
    queryFn: async () => {
        const response = await fetch('https://tentlify-ecom.up.railway.app/api/search')
        const data = await response.json()
        return data
    }
})

</script>

<template>

<div class="mt-20 mx-auto w-11/12">
    <h1 class="text-3xl">All Searches</h1>


    <div v-for="item in searches" class="w-full">
        <RouterLink :to="`/admin/search-details/${item._id}`" :key="item._id" class="flex items-center justify-between gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-md my-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 transition duration-300" aria-label="View search details">
            <h1>"{{item.term}}"</h1>
            <span class="text-gray-400 italic text-xs">{{new Date(item.createdAt).toLocaleString()}}</span>
            <h1>{{item.resultsCount}} results</h1>
        </RouterLink>
    </div>

    
</div>
</template>