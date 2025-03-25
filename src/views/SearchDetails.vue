<script setup>
import PageSpinner from '@/components/custom/Loading/PageSpinner.vue';
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;

const { data: searchTerm, isLoading } = useQuery({
  queryKey: ['search'],
  queryFn: async () => {
    const response = await fetch(`https://tentlify-ecom.up.railway.app/api/search/${id}`);
    const data = await response.json();
    return data;
  },
});
</script>

<template>
  <div class="mt-20 mx-auto w-11/12">
    <div v-if="isLoading">
      <PageSpinner />
    </div>

    <h1 v-else class="text-3xl">Search Details for "{{ searchTerm?.term }}"</h1>
    <p>Results: {{ searchTerm?.resultsCount }}</p>
    <div v-for="item in searchTerm?.resultIds" :key="item._id">
      <div class="flex flex-row items-center justify-between border-b border-gray-200 p-4 w-11/12 mx-auto">
        <div class="flex flex-row items-center">
          <img
            width="{300}"
            height="{200}"
            :src="item.image"
            :alt="item.product"
            class="w-20 h-20 object-contain rounded-md"
          />
          <div class="ml-4">
            <p class="text-md md:text-xl font-bold">{{ item.product }}</p>
          </div>
        </div>
        <p class="text-md md:text-xl font-bold">
          ${{ item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
        </p>
      </div>
    </div>
  </div>
</template>
