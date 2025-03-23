<script setup>
import OrdersTab from '@/components/custom/Admin/OrdersTab.vue';
import ProductsTab from '@/components/custom/Admin/ProductsTab.vue';
import SearchTab from '@/components/custom/Admin/SearchTab.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CoListRich, CoTag } from "oh-vue-icons/icons";
import { OhVueIcon } from 'oh-vue-icons';
import { addIcons } from 'oh-vue-icons';
import { FaSearch } from "oh-vue-icons/icons";




addIcons(CoTag, CoListRich, FaSearch)

</script>

<template>
    <div class="mt-20 mx-auto w-full md:w-11/12 p-2">
        <h1 class="text-3xl">Admin</h1>
        <Tabs default-value="orders" class="w-full">
    <TabsList class="w-full bg-safariGreen p-2 h-12">
      <TabsTrigger value="orders" class="w-full h-10 text-xl text-primary">
        <OhVueIcon name="co-list-rich" class="w-6 h-6" />
        Orders
      </TabsTrigger>
      <TabsTrigger value="products" class="w-full h-10 text-xl text-primary">
        <OhVueIcon name="co-tag" class="w-6 h-6" />
        Products
      </TabsTrigger>
      <TabsTrigger value="search" class="w-full h-10 text-xl text-primary">
        <OhVueIcon name="fa-search" class="w-6 h-6" />
        Search
      </TabsTrigger>
    </TabsList>
    <TabsContent value="orders">
      <OrdersTab />
    </TabsContent>
    <TabsContent value="products">
      <ProductsTab />
    </TabsContent>
    <TabsContent value="search">
      <SearchTab />
    </TabsContent>
  </Tabs>
    </div>
</template>