<script setup>
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useOrderStore } from '@/stores/OrdersStore';
import { computed, onMounted, ref } from 'vue';
import OrderStatusSelect from './OrderStatusSelect.vue';
import { useRouter } from 'vue-router';
import PageSpinner from '../Loading/PageSpinner.vue';

const router = useRouter()


const orderStore = useOrderStore()

onMounted(async()=> {
    await orderStore.fetchOrders()
})
let loading = computed(()=> orderStore.isLoading)

</script>

<template>
    <Table>
    <TableCaption>A list of all orders.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead class="hidden md:table-cell">Created</TableHead>
        <TableHead class="hidden md:table-cell">Event Date</TableHead>
        <TableHead>Status</TableHead>
        <TableHead class="hidden md:table-cell">Amount</TableHead>
        <TableHead>Link</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow v-if="loading">
        <TableCell colspan="6" class="text-center py-4">
          <PageSpinner />
        </TableCell>
      </TableRow>
      <TableRow v-else v-for="order in orderStore.orders" :key="order._id">
        <TableCell class="font-medium">{{order.title}}</TableCell>
            <TableCell class="hidden md:table-cell">{{order.createdAt ? new Date(order.createdAt).toLocaleDateString(): 'N/A'}}</TableCell>
            <TableCell class="hidden md:table-cell">{{order.eventDate ? new Date(order.eventDate).toLocaleDateString() : 'N/A' }}</TableCell>
            <TableCell><OrderStatusSelect :item="order" /></TableCell>
            <TableCell class="hidden md:table-cell">${{order.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}</TableCell>
            <TableCell><button @click="()=> router.push(`/order/${order._id}`)" class="text-blue-500">View</button></TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>