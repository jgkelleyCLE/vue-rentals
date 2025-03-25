<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

defineProps({
  title: {
    type: String,
  },
  image: {
    type: String,
  },
});
</script>

<template>
  <button @click="() => router.push(`/category/${title}`)">
    <div class="relative">
      <img
        width="{500}"
        height="{300}"
        :src="image"
        alt="title"
        class="w-full h-[200px] object-cover rounded-md shadow-md shadow-black/20 hover:scale-110"
      />
      <div
        class="bg-black/25 absolute top-0 left-0 z-10 w-full h-full rounded-md hover:bg-black/5 transition duration-200"
      ></div>
      <h1 class="absolute bottom-1 right-2 text-white text-3xl font-bold z-10">{{ title }}</h1>
    </div>
  </button>
</template>
