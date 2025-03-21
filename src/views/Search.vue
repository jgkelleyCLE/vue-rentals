<script setup>

import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const searchQuery = computed(()=> route.query.q || '')

console.log('searchQuery:', searchQuery.value)


</script>

<template>

<div class="mt-20 mx-auto w-11/12">
        <h1 class="text-3xl">Search Results for: "{{  searchQuery }}"</h1>
    </div>
</template>