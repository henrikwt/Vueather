<script setup>
import { ref } from 'vue'
import fetchWeatherData from '../utils/fetchWeatherData'

const geoCoding = async (address) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${
      import.meta.env.SECRET_GOOGLE_MAPS_API_KEY
    }`
  )
  return await response.json()
}

const emit = defineEmits(['locationFetched'])

const location = ref('')
const notFound = ref(false)
const handleSubmit = async () => {
  const locationData = await geoCoding(location.value)
  if (locationData?.results !== undefined && locationData?.results.length !== 0) {
    notFound.value = false
    const locationName = locationData.results[0].formatted_address
    const coordinates = locationData.results[0].geometry.location
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const weatherData = await fetchWeatherData(coordinates.lat, coordinates.lng, timezone)
    weatherData.locationName = locationName
    emit('locationFetched', weatherData)
  } else {
    notFound.value = true
    console.log('Location not found')
  }
}
</script>

<template>
  <form id="location-form-id" @submit.prevent="handleSubmit">
    <div class="input-location-form">
      <div class="input-wrapper">
        <div style="max-width: 605px">
          <label
            for="location-input-id"
            class="dfo-input"
            :class="{ 'dfo-input--is-error': notFound }"
            ><span
              class="dfo-error-wrapper"
              aria-live="assertive"
              aria-relevant="additions removals"
              >Lokasjon:
              <input
                v-model="location"
                type="text"
                aria-invalid="false"
                name="firstName"
                placeholder=""
                id="location-input-id"
                required
              />
              <span class="dfo-error-wrapper__error" :class="{ 'hide-error': !notFound }"
                >Fant ikke lokasjonen</span
              >
            </span></label
          >
        </div>
      </div>
      <div class="button-wrapper">
        <div>
          <button class="dfo-button" type="submit">Legg til lokasjon</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
.input-location-form {
  font-size: 10px;
}
.hide-error {
  display: none;
}
</style>
