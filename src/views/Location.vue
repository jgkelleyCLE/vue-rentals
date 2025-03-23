<script setup>
import { MglMap, MglMarker } from 'vue-maplibre-gl';
</script>

<template>

  <div class="w-full h-[100vh]">
    <mgl-map
      mapStyle="https://api.maptiler.com/maps/landscape/style.json?key=JrhJ9PEPy4IfAvYJE85H"
      :center="[-81.6957735, 41.499862]"
      :zoom=10
    >
    <mgl-marker :coordinates="[-81.6957735, 41.499862]" color="#42b883" >
    </mgl-marker>
    
  </mgl-map>
    
  </div>
</template>


<style>
/* Keep these global styles but modify them */
@import "maplibre-gl/dist/maplibre-gl.css";
@import "vue-maplibre-gl/dist/vue-maplibre-gl.css";





</style>