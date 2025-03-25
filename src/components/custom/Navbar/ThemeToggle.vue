<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Button from '@/components/ui/button/Button.vue';
import { useColorMode } from '@vueuse/core';
import { FaSun } from 'oh-vue-icons/icons';
import { FaMoon } from 'oh-vue-icons/icons';
import { OhVueIcon } from 'oh-vue-icons';
import { addIcons } from 'oh-vue-icons';

addIcons(FaSun, FaMoon);

const mode = useColorMode();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon" class="relative">
        <OhVueIcon
          name="fa-sun"
          class="w-10 h-10 rotate-0 scale-100 transition-all text-gray-700 dark:-rotate-90 dark:scale-0"
        />
        <OhVueIcon
          name="fa-moon"
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="mode = 'light'">
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'">
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'auto'">
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
