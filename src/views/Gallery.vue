<script setup>
import { ref } from 'vue';

const videoLinks = ref([
  'https://www.youtube.com/embed/YykPGGq2XR4',
  'https://www.youtube.com/embed/kpTeQwMAy4c',
  'https://www.youtube.com/embed/EAFEEor52fk',
  'https://www.youtube.com/embed/SrugbNLBar4',
  'https://www.youtube.com/embed/HSRU_s6n7q4',
  'https://www.youtube.com/embed/1LaIVbsAzB0',
  'https://www.youtube.com/embed/9xie0QHmDRE',
  'https://www.youtube.com/embed/ZmjWonBhID4',
  'https://www.youtube.com/embed/1BkB0iyoyps',
  'https://www.youtube.com/embed/Ugy35SE73k8',
]);
</script>

<template>
  <div class="mt-20 mx-auto w-11/12">
    <h1 class="text-3xl">Gallery</h1>
    <div class="flex flex-col items-center">
      <iframe
        width="800"
        height="315"
        src="https://www.youtube.com/embed/4Vi7ssA4HWQ"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        class="w-11/12 h-[600px] max-w-[1200px] my-4"
      ></iframe>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div v-for="(link, index) in videoLinks" :key="index" class="my-4">
          <iframe :src="link" title="YouTube video player" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
