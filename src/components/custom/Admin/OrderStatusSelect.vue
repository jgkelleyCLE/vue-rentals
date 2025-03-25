<script setup>
import { updateOrderStatus } from '@/lib/api/ordersApi';
import { useOrderStore } from '@/stores/OrdersStore';
import { useMutation } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';

// Define props - keep it simple
const props = defineProps({
  item: Object,
});

console.log('Item', props.item);

// Get order store
const orderStore = useOrderStore();

// List of available statuses
const statuses = ['Quote', 'Reservation', 'Delivered', 'Closed', 'Cancelled'];

// Create mutation
const mutation = useMutation({
  mutationFn: (status) => updateOrderStatus(props.item._id, status),
  onSuccess: () => {
    toast.success('Status updated successfully');
  },
  onError: (error) => {
    toast.error('Error updating status');
    console.log('Error updating status', error);
  },
});
</script>

<template>
  <select
    :value="props?.item?.status || 'Quote'"
    @change="(e) => mutation.mutate(e.target.value)"
    class="border border-gray-300 rounded-md px-2 py-1 text-gray-700"
  >
    <option v-for="status in statuses" :key="status" :value="status">
      {{ status }}
    </option>
  </select>
</template>
