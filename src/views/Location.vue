<script setup>
import { onMounted, ref } from 'vue';
import { MglMap, MglNavigationControl, MglMarker } from 'vue-maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// Create reactive references for map configuration
const mapRef = ref(null);
// const mapStyle = ref('https://api.maptiler.com/maps/streets/style.json?key=YOUR_MAPTILER_KEY');
const mapStyle = ref('https://basemaps.cartocdn.com/gl/positron-gl-style/style.json');
const center = ref([-81.6944, 41.4993]); // Cleveland, OH coordinates
const zoom = ref(12);

// Optional: Custom marker position
const markerCoordinates = ref([-81.6944, 41.4993]);
const markerPopupContent = ref('Our Office Location');

// Optional: Initialize the map after component is mounted
onMounted(() => {
  console.log('Map component mounted');
});
</script>

<template>
    <div class="mt-20 mx-auto w-11/12">
      <h1 class="text-3xl mb-6">Location</h1>
      
      <div class="h-[500px] w-full rounded-lg overflow-hidden border border-gray-300">
        <MglMap
          ref="mapRef"
          :mapStyle="mapStyle"
          :center="center"
          :zoom="zoom"
          @load="() => console.log('Map loaded')"
        >
          <!-- Add navigation controls -->
          <MglNavigationControl position="top-right" />
          
        
          
          <!-- Add a marker for your business location -->
          <MglMarker :coordinates="markerCoordinates">
            <template #marker>
              <div class="custom-marker">
                <div class="marker-pin bg-blue-500"></div>
              </div>
            </template>
            
            <template #popup>
              <div>
                <h3 class="text-lg font-bold">Tentlify Rentals</h3>
                <p>{{ markerPopupContent }}</p>
              </div>
            </template>
          </MglMarker>
        </MglMap>
      </div>
      
      
    </div>
  </template>


<style>
/* Import MapLibre CSS */
@import 'maplibre-gl/dist/maplibre-gl.css';

/* Custom marker styles */
.custom-marker {
  position: relative;
}

.marker-pin {
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.marker-pin::after {
  content: '';
  width: 20px;
  height: 20px;
  margin: 5px 0 0 5px;
  background-color: white;
  border-radius: 50%;
}
</style>