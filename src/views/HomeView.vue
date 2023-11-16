<script setup>
import GetLocation from '../components/GetLocation.vue'
import GetLocationFromInput from '../components/GetLocationFromInput.vue'
import FavoritesList from '../components/FavoritesList.vue'
import fetchWeatherData from '../utils/fetchWeatherData'

import { ref, onMounted, onUnmounted } from 'vue'

const addedLocations = ref([])
const interval = ref(null)
const homeLocation = ref(false)
const REFETCH_DATA_INTERVAL_MS = 60000

onMounted(() => {
  const savedLocations = JSON.parse(localStorage.getItem('locations'))
  if (savedLocations) {
    addedLocations.value = savedLocations
  }
  refetchData()
  interval.value = setInterval(refetchData, REFETCH_DATA_INTERVAL_MS)
})

onUnmounted(() => {
  clearInterval(interval.value)
})

const refetchData = async () => {
  if (addedLocations.value.length !== 0) {
    addedLocations.value.forEach(async (location, index) => {
      // Also check if homeLocation is there.
      if (location?.home) {
        homeLocation.value = true
      }
      const refetchedData = await fetchWeatherData(
        location.latitude,
        location.longitude,
        Intl.DateTimeFormat().resolvedOptions().timeZone
      )
      const mergedObject = { ...location }
      for (const property in refetchedData) {
        mergedObject[property] = refetchedData[property]
      }
      addedLocations.value[index] = mergedObject
      saveLocationsToLocalStorage()
    })
  }
}

const handleLocationFetched = async (weatherData) => {
  const response = await weatherData
  if (response?.home) {
    homeLocation.value = true
  }
  // response.id = crypto.randomUUID()
  response.id = Math.floor(Math.random() * 1000000)
  addedLocations.value.unshift(response)
  saveLocationsToLocalStorage()
}

const handleDeleteLocation = (id) => {
  addedLocations.value = addedLocations.value.filter((location) => {
    if (location?.home && location.id === id) {
      homeLocation.value = false
    }
    return location.id !== id
  })
  saveLocationsToLocalStorage()
}

const saveLocationsToLocalStorage = () => {
  localStorage.setItem('locations', JSON.stringify(addedLocations.value))
}
</script>

<template>
  <main>
    <Suspense>
      <template #default>
        <FavoritesList :addedLocations="addedLocations" @deleteLocation="handleDeleteLocation" />
      </template>
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
    <h2 v-if="addedLocations.length < 1">Legg til en lokasjon for å få værdata!</h2>
    <div class="get-location-container">
      <div>
        <GetLocationFromInput @locationFetched="handleLocationFetched" />
        <GetLocation
          @locationFetched="handleLocationFetched"
          @locationUpdated="handleLocationUpdated"
          :homeLocation="homeLocation"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
h2 {
  margin: 1rem;
  text-align: center;
}
.get-location-container {
  margin: 0 calc(100vw * 0.25);
  margin-bottom: 2rem;
}
@media (max-width: 650px) {
  .get-location-container {
    margin: 0 2rem;
    margin-bottom: 2rem;
  }
}
</style>
