<script setup>
import { ref } from 'vue'
import GetLocation from './GetLocation.vue'

const reverseGeoCoding = async (latitude, longitude) => {
  // const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&location_type=ROOFTOP&result_type=street_address&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`);
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&location_type=APPROXIMATE&result_type=locality&key=${
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    }`
  )
  const data = await response.json()
  // Handle error
  console.log('name')
  console.log(data)
  if (data?.results[0]?.formatted_address) {
    return data.results[0].formatted_address
  }
  return null
}

const geoCoding = async (address) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    }`
  )
  return await response.json()
}

const emit = defineEmits(['locationFetched'])

const fetchWeatherData = async (latitude, longitude, timezone) => {
  // const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=${timezone}&forecast_days=1`);
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,rain&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=${timezone}`
  )
  return await response.json()
}

const location = ref('')
const notFound = ref(false);
const handleSubmit = async () => {
  const locationData = await geoCoding(location.value)
  console.log(locationData)
  console.log('THE DATA ABOIVE')
  if (locationData?.results !== undefined && locationData?.results.length !== 0) {
    notFound.value = false;
    const locationName = locationData.results[0].formatted_address
    const coordinates = locationData.results[0].geometry.location
    // Should this be the timezone of the location?
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const weatherData = await fetchWeatherData(coordinates.lat, coordinates.lng, timezone)
    weatherData.locationName = locationName
    emit('locationFetched', weatherData)
  } else {
    notFound.value = true;
    console.log('location not found')
  }
}
</script>

<template>
  <form id="location-form-id" @submit.prevent="handleSubmit">
    <div class="input-location-form">
      <!-- <label for="location-input-id">Lokasjon</label>
        <input v-model="location" type="text" id="location-input-id" placeholder="Skriv inn en lokasjon..." required/> -->
      <div class="input-wrapper">
        <div style="max-width: 705px">
          <label for="location-input-id" class="dfo-input" :class="{'dfo-input--is-error': notFound}"
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
                required />
                <span class="dfo-error-wrapper__error" :class="{'hide-error': !notFound}">Fant ikke lokasjonen</span>
              </span
          ></label>
        </div>
      </div>
      <!-- <button type="submit">Legg til lokasjon</button> -->
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
  padding: 24px;
  font-size: 10px;

}

.input-wrapper {

}

.button-wrapper {

}
.hide-error {
  display: none;
}

</style>
