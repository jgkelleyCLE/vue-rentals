<script setup>
import PageSpinner from '@/components/custom/Loading/PageSpinner.vue';
import ProductCard from '@/components/custom/Product/ProductCard.vue';
import { useProductStore } from '@/stores/ProductStore';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const slug = ref(route.params.slug);

let products = ref([]);

const productStore = useProductStore();

onMounted(() => {
  products = productStore.fetchProductCategory(slug.value);
});
</script>

<template>
  <div class="mt-20 mx-auto w-11/12 max-w-[1800px]">
    <h1 class="text-3xl">{{ slug }}</h1>

    <div class="flex flex-col items-center w-full" v-if="productStore.isLoading">
      <PageSpinner />
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 p-4"
    >
      <div v-for="product in productStore.products" :key="product.id">
        <ProductCard :item="product" />
      </div>
    </div>
  </div>
</template>
