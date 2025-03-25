<script setup>
import { ref, onMounted, nextTick } from 'vue';

// Simple state for UI
const loading = ref(true);
const error = ref(null);
const searchData = ref(null);

// Wait for DOM to be fully ready, then create chart
onMounted(async () => {
  try {
    // 1. First fetch data
    loading.value = true;
    const response = await fetch('https://tentlify-ecom.up.railway.app/api/search');

    if (!response.ok) {
      throw new Error('Failed to fetch search data');
    }

    const searches = await response.json();

    if (!Array.isArray(searches)) {
      throw new Error('API did not return an array');
    }

    // 2. Process the data
    const counts = {};
    searches.forEach((search) => {
      if (search?.term) {
        const term = search.term.toLowerCase();
        counts[term] = (counts[term] || 0) + 1;
      }
    });

    const topSearches = Object.entries(counts)
      .map(([term, count]) => ({ term, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // 3. Store processed data
    searchData.value = topSearches;
    loading.value = false;

    // 4. Wait for UI to update and canvas to be in DOM
    await nextTick();

    // 5. Import Chart.js and create chart
    setTimeout(async () => {
      try {
        const Chart = (await import('chart.js/auto')).default;
        const canvas = document.getElementById('searchChart');

        if (!canvas) {
          throw new Error('Canvas element not found after waiting');
        }

        new Chart(canvas, {
          type: 'bar',
          data: {
            labels: topSearches.map((item) => item.term),
            datasets: [
              {
                label: '# of Searches',
                data: topSearches.map((item) => item.count),
                backgroundColor: 'rgba(63, 178, 127, 0.6)',
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } },
          },
        });
      } catch (chartErr) {
        console.error('Chart initialization error:', chartErr);
        error.value = chartErr.message;
      }
    }, 100); // Small delay after nextTick
  } catch (err) {
    console.error('Data fetch error:', err);
    error.value = err.message;
    loading.value = false;
  }
});
</script>

<template>
  <div class="chart-container">
    <!-- Loading indicator -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <div>Loading search data...</div>
    </div>

    <!-- Error message -->
    <div v-else-if="error" class="error">
      <div>Error: {{ error }}</div>
      <button @click="window.location.reload()" class="reload-btn">
        Try Again
      </button>
    </div>

    <!-- Always render the canvas, but hide it when loading or error -->
    <canvas
      id="searchChart"
      width="400"
      height="200"
      :style="{ display: !loading && !error ? 'block' : 'none' }"
    ></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
  position: relative;
}
.loading,
.error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
}
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}
.error {
  color: #e74c3c;
  text-align: center;
}
.reload-btn {
  margin-top: 10px;
  padding: 5px 10px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
