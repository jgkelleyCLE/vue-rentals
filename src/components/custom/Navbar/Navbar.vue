<script setup>
import { ViFileTypeVue } from 'oh-vue-icons/icons';
import { OhVueIcon } from 'oh-vue-icons';
import { addIcons } from 'oh-vue-icons';
import NavLinks from './NavLinks.vue';
import CartSheet from '../Cart/CartSheet.vue';
import ThemeToggle from './ThemeToggle.vue';
import MenuDrawer from './MenuDrawer.vue';
import { useCartStore } from '@/stores/CartStore';
import { onMounted } from 'vue';

addIcons(ViFileTypeVue);
</script>

<template>
  <div class="bg-gray-800/80 p-2 flex items-center justify-between h-16 text-white absolute top-0 left-0 w-full z-20">
    <div class="md:hidden">
      <MenuDrawer />
    </div>
    <div class="relative">
      <a href="/" aria-label="Tentlify Home">
        <img
          width="200"
          src="../../../assets/Tenlify_Logo_Thin_Small.png"
          alt="TentlifyLogo"
          class="w-32 md:w-44 h-full"
        />
        <OhVueIcon
          name="vi-file-type-vue"
          class="absolute top-7 right-0 w-5 h-5 md:top-10 md:-right-1 z-20 md:h-8 md:w-8"
        />
      </a>
    </div>
    <div class="flex items-center gap-2">
      <NavLinks />
      <ThemeToggle />
      <CartSheet />
    </div>
  </div>
</template>
