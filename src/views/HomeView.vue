<script setup>
import GetLocation from '../components/GetLocation.vue'
import GetLocationFromInput from '../components/GetLocationFromInput.vue'
import FavoritesList from '../components/FavoritesList.vue'

import { ref, computed, onMounted } from 'vue'

const addedLocations = ref([])

onMounted(() => {
  const savedLocations = JSON.parse(localStorage.getItem('locations'))
  if (savedLocations) {
    addedLocations.value = savedLocations
  }
})

const handleLocationFetched = async (weatherData) => {
  const response = await weatherData
  response.id = crypto.randomUUID()
  console.log(response)
  addedLocations.value.push(response)
  saveLocationsToLocalStorage()
}

const handleDeleteLocation = (id) => {
  console.log('Delete location')
  console.log(id)
  addedLocations.value = addedLocations.value.filter((location) => location.id !== id)
  saveLocationsToLocalStorage()
}

const saveLocationsToLocalStorage = () => {
  localStorage.setItem('locations', JSON.stringify(addedLocations.value))
}
</script>

<template>
  <main>
    <FavoritesList :addedLocations="addedLocations" @deleteLocation="handleDeleteLocation" />
    <GetLocation @locationFetched="handleLocationFetched" />
    <GetLocationFromInput @locationFetched="handleLocationFetched" />
  </main>
</template>
