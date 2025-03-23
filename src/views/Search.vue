<script setup>

import PageSpinner from '@/components/custom/Loading/PageSpinner.vue'
import ProductCard from '@/components/custom/Product/ProductCard.vue'
import { searchProducts } from '@/lib/api/productsApi'
import { createSearch } from '@/lib/api/searchApi'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { ref, computed, onMounted, watch, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const searchQuery = computed(()=> route.query.q || '')


const { data: searchData, isLoading, isError, error } = useQuery({
    queryKey: ['search', searchQuery.value],
    queryFn: async () => {
        const response = await fetch(`https://tentlify-ecom.up.railway.app/api/products/search?q=${encodeURIComponent(searchQuery.value)}`)
        if (!response.ok) throw new Error(`Search failed with status: ${response.status}`)
        return response.json()
    },
    enabled: !!searchQuery.value // Only run if there's a search query
})

const { mutate: createSearchRecord } = useMutation({
    mutationFn: createSearch,
    onSuccess: () => console.log('Search recorded')
})

watchEffect(() => {
    if (searchQuery.value && searchData.value) {
        createSearchRecord({
            term: searchQuery.value,
            resultsCount: searchData.value.length,
            resultIds: searchData.value.map(item => item._id)
        })
    }
})

</script>

<template>

<div class="mt-20 mx-auto w-11/12">
        <h1 class="text-3xl">Search Results for: "{{  searchQuery }}"</h1>

        <div class="flex flex-col items-center w-11/12 mx-auto">
            <!-- LOADING -->
            <div v-if="isLoading" class="p-8 text-center">
                <PageSpinner />
            </div>
            
            <!-- ERROR -->
            <div v-else-if="error" class="p-8 text-center text-red-500">
                <p>Error loading search results</p>
                <p class="text-sm">{{ error.message }}</p>
            </div>
            
            <!-- RESULTS -->
            <div v-else-if="searchData && searchData.length > 0" 
                 class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 p-4">
                <ProductCard v-for="item in searchData" :key="item._id" :item="item" />
            </div>
            
            <!-- No results -->
            <div v-else class="p-8 text-center">
                <p class="text-lg mb-4">No products found matching "{{ searchQuery }}"</p>
                <RouterLink :to="`/product`" class="bg-safariGreen hover:bg-safariGreenHover text-white font-bold p-2 transition duration-300 rounded-md">
                    Browse all products
                </RouterLink>
            </div>
        </div>
    </div>
</template>