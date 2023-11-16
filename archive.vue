<!-- This file is just for reference -->
<!-- FavoritesList.vue -->
<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import IconDelete from './icons/IconDelete.vue';
import IconHome from './icons/IconHome.vue';
import IconSync from './icons/IconSync.vue';

const router = useRouter()
const route = useRoute()

defineProps({
  addedLocations: {
    type: Array,
    required: true
  }
})
const handleOpenDetailedView = (addedLocation) => {
  console.log('Open detailed view')
  console.log(addedLocation)
  router.push('/details/' + addedLocation.id)
}
const emit = defineEmits(['deleteLocation'])
const deleteLocation = (id) => {
  console.log('Delete location')
  console.log(id)
  emit('deleteLocation', id)
}
</script>

<template>
  <div class="data-container">
    
    <div
      v-for="addedLocation in addedLocations"
      class="data-summarized"
      @click="($event) => handleOpenDetailedView(addedLocation)"
      :key="addedLocation.id"
    >
      <h2>{{ addedLocation.locationName }} 
        <IconHome v-if="addedLocation?.home"/>
      </h2>
      Temp: {{ Math.round(addedLocation.current.temperature_2m) }}°C, Effektiv temp:
      {{ addedLocation.current.apparent_temperature }}
      <button class="delete-button" @click.stop="deleteLocation(addedLocation.id)">
        <IconDelete />
      </button>
    </div>
    <IconSync />
  </div>
</template>

<style scoped>

.delete-button {
  position: relative;
  /* float: right; */
  
}

.data-container {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
}
.data-summarized {
  
  min-width: 50%;
  padding: 1rem;
  margin: 1rem;
  /* font-size: 1.5rem; */
  font-weight: 500;
  border: 1px solid black;
}
.data-summarized:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}
</style>


<!-- Fetchweather -->
// const fetchWeatherData = async (latitude, longitude, timezone) => {
  //     const response = await fetch(
  //       `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,rain,cloud_cover&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=${timezone}`
  //     )
  //     return await response.json()
  //   }
  
  // export default fetchWeatherData;

  // const FavoritesList = defineAsyncComponent(() =>
//   import('../components/FavoritesList.vue')
// )