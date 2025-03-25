<script setup>
import { useQuery } from '@tanstack/vue-query';
import PopularSearches from '../Search/PopularSearches.vue';
import RecentSearches from '../Search/RecentSearches.vue';
import SearchChart from '../Search/SearchChart.vue';

const { data: searches } = useQuery({
  queryKey: ['searches'],
  queryFn: async () => {
    const response = await fetch('https://tentlify-ecom.up.railway.app/api/search');
    const data = await response.json();
    return data;
  },
});
</script>

<template>
  <div class="p-2 w-full flex flex-col h-[100%]">
    <!-- CHART CONTAINER -->
    <div class="w=full">
      <h1 class="text-2xl font-bold text-gray-700 dark:text-gray-400">Most Popular Searches</h1>
      <SearchChart :searches="searches" />
    </div>

    <!-- FLEX CONTAINER FOR SEARCH STATS -->
    <div class="flex flex-col md:flex-row items-center gap-2 h-1/2 mt-2">
      <RecentSearches :searches="searches" />
      <PopularSearches :searches="searches" />
    </div>
  </div>
</template>
