<script setup>
import GetLocation from '../components/GetLocation.vue'
import GetLocationFromInput from '../components/GetLocationFromInput.vue'
import FavoritesList from '../components/FavoritesList.vue'
import fetchWeatherData from '../utils/fetchWeatherData'

import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const addedLocations = ref([])
const interval = ref(null);
const homeLocation = ref(false);

onMounted(() => {
  const savedLocations = JSON.parse(localStorage.getItem('locations'))
  if (savedLocations) {
    addedLocations.value = savedLocations
  }
  refetchData();
  interval.value = setInterval(refetchData, 60000)
})

onUnmounted(() => {
  clearInterval(interval.value);
})

const refetchData = async () => {
  if (addedLocations.value.length !== 0) {
    addedLocations.value.forEach(async (location, index) => {
      // Also check if homeLocation is there.
      if (location?.home) {
        homeLocation.value = true;
      }
      const refetchedData = await fetchWeatherData(location.latitude, location.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone);
      const mergedObject = {...location};
      for (const property in refetchedData ) {
        mergedObject[property] = refetchedData[property];
      }
      addedLocations.value[index] = mergedObject;
      saveLocationsToLocalStorage()
    });
  }
}

const handleLocationFetched = async (weatherData) => {
  const response = await weatherData
  if (response?.home) {
    homeLocation.value = true;
  }
  response.id = crypto.randomUUID()
  addedLocations.value.push(response)
  saveLocationsToLocalStorage()
}
// const handleLocationUpdated = async (id) => {
// Function to allow updating the geolocation of the device in case it moves around.
// This can just be done by deleting and clicking the button again.
// It could be nice to automatically update the "home location", each time the app is opened.
// }

const handleDeleteLocation = (id) => {
  console.log('Delete location')
  console.log(id)
  
  addedLocations.value = addedLocations.value.filter((location) => {
    if (location?.home && location.id === id) {
      homeLocation.value = false;
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
    <FavoritesList :addedLocations="addedLocations" @deleteLocation="handleDeleteLocation" />
    <GetLocation @locationFetched="handleLocationFetched" @locationUpdated="handleLocationUpdated" :homeLocation="homeLocation" />
    <GetLocationFromInput @locationFetched="handleLocationFetched" />
  </main>
</template>
