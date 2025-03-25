<script setup>
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import PageSpinner from '../Loading/PageSpinner.vue';
import ProductStatusSelect from './ProductStatusSelect.vue';
import EditProduct from './EditProduct.vue';
import { useQuery } from '@tanstack/vue-query';
import { RouterLink } from 'vue-router';

const { data: products, isLoading, error } = useQuery({
  queryKey: ['products'],
  queryFn: async () => {
    const response = await fetch('https://tentlify-ecom.up.railway.app/api/products');
    const data = await response.json();
    return data;
  },
});
</script>

<template>
  <Table>
    <TableCaption>A list of all products.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="hidden md:table-cell">Image</TableHead>
        <TableHead>Product</TableHead>
        <TableHead class="hidden md:table-cell">Category</TableHead>
        <TableHead>Status</TableHead>
        <TableHead class="hidden md:table-cell">Amount</TableHead>
        <TableHead>Edit</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-if="isLoading">
        <TableCell colspan="6" class="text-center py-4">
          <PageSpinner />
        </TableCell>
      </TableRow>
      <TableRow
        v-else
        v-for="item in products"
        :key="item._id"
        :class="['border-2 border-gray-300 relative', { 'bg-red-100 dark:bg-red-950/75': item.status === 'Inactive' }]"
      >
        <TableCell class="hidden md:table-cell"
          ><RouterLink :to="`/product/${item._id}`"
            ><img width="75" height="50" :src="item.image" :alt="item.product" /></RouterLink
        ></TableCell>
        <TableCell
          ><RouterLink :to="`/product/${item._id}`">{{ item.product }}</RouterLink></TableCell
        >
        <TableCell class="hidden md:table-cell">{{ item.category }}</TableCell>
        <TableCell>
          <ProductStatusSelect :item="item" />
        </TableCell>
        <TableCell textAlign="end" class="hidden md:table-cell">
          ${{ item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
        </TableCell>

        <TableCell textAlign="end">
          <EditProduct :item="item" />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
