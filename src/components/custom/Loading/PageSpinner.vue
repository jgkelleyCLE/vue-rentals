<script setup>
import { OhVueIcon } from 'oh-vue-icons';
import { PrSpinner } from "oh-vue-icons/icons";
import { addIcons } from 'oh-vue-icons';
import { useProductStore } from '@/stores/ProductStore';

addIcons(PrSpinner)

const productStore = useProductStore()

</script>

<template>

    <div class="flex flex-col items-center w-full" v-if="productStore.isLoading">
        <OhVueIcon name="pr-spinner" class="w-16 h-16 text-safariGreen animate-spin" />
    </div>
</template>