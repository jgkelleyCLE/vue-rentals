import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import VueMaplibreGl from 'vue-maplibre-gl'
// import 'maplibre-gl/dist/maplibre-gl.css'


const app = createApp(App).use(createPinia())
app.use(VueQueryPlugin)
app.use(VueMaplibreGl)
app.use(router)
app.mount('#app')
