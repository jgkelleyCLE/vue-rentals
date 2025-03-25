<script setup>
import OrderStatusSelect from '@/components/custom/Admin/OrderStatusSelect.vue';
import PageSpinner from '@/components/custom/Loading/PageSpinner.vue';
import { useOrderStore } from '@/stores/OrdersStore';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = ref(route.params.id);
const orderStore = useOrderStore();

onMounted(async () => {
  await orderStore.fetchOrder(id.value);
});

const order = computed(() => orderStore.order);
</script>

<template>
  <div class="mt-20 mx-auto w-11/12 max-w-[1800px]">
    <div v-if="orderStore.isLoading">
      <PageSpinner />
    </div>
    <div v-else>
      <h1 class="text-2xl ml-8">{{ order?.title }} Order Details</h1>
      <div class="flex flex-col items-start ml-8">
        <p class="text-sm italic text-gray-500">Order ID: {{ order?._id }}</p>
        <p class="text-sm italic text-gray-500">Order Date: {{ new Date(order?.createdAt).toLocaleString() }}</p>
        <p class="text-sm italic text-gray-500 mb-1">
          Event Date: {{ new Date(order?.eventDate).toLocaleDateString() }}
        </p>

        <OrderStatusSelect :item="order" />
      </div>

      <div
        v-for="item in order?.orderItems"
        :key="item._id"
        class="flex flex-row items-center justify-between border-b border-gray-200 p-4 w-11/12 mx-auto"
      >
        <div class="flex flex-row items-center">
          <img width="{300}" height="{200}" :src="item.image" alt="{item.product}" class="w-20 h-20 object-contain" />
          <div class="ml-4">
            <p class="text-md md:text-xl font-bold">{{ item.product }}</p>
            <p class="text-sm italic">Qty: {{ item.cartQuantity }}</p>
          </div>
        </div>
        <p class="text-md md:text-xl font-bold">
          ${{ item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
        </p>
      </div>
    </div>
  </div>
</template>
