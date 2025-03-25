<script setup>
import { OhVueIcon } from 'oh-vue-icons';
import { PrSpinner } from 'oh-vue-icons/icons';
import { addIcons } from 'oh-vue-icons';

addIcons(PrSpinner);
</script>

<template>
  <div class="flex flex-col items-center w-full">
    <OhVueIcon name="pr-spinner" class="w-16 h-16 text-safariGreen animate-spin" />
  </div>
</template>
