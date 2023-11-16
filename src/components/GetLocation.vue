<script setup>
import fetchWeatherData from '../utils/fetchWeatherData'

defineProps({
  homeLocation: {
    type: Boolean,
    required: true
  }
})

const reverseGeoCoding = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&location_type=APPROXIMATE&result_type=locality&key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }`
    )
    const data = await response.json()
    if (data?.results[0]?.formatted_address) {
      return data.results[0].formatted_address
    }
  } catch (error) {
    console.log('Failed to fetch location')
    console.log(error)
  }
}

const emit = defineEmits(['locationFetched', 'locationUpdated'])

const getGeoLocation = async (update) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const weatherData = await fetchWeatherData(
            position.coords.latitude,
            position.coords.longitude,
            timezone
          )
          const cityName = await reverseGeoCoding(
            position.coords.latitude,
            position.coords.longitude
          )
          weatherData.locationName = cityName
          weatherData.home = true

          if (!update) {
            emit('locationFetched', weatherData)
          } else {
            emit('locationUpdated', weatherData)
          }
        } catch (error) {
          alert('Værdata kunne ikke hentes')
          console.log('Failed to fetch weather')
          console.log(error)
        }
      },
      (error) => {
        alert('Du har blokkert stedstjenester for dette nettstedet.')
        console.log(error.message)
      }
    )
  } else {
    console.log('Geolocation is not supported by this browser.')
  }
}
</script>

<template>
  <div>
    <button
      class="dfo-button dfo-button--cta geo-button"
      @click="getGeoLocation(false)"
      v-if="!homeLocation"
    >
      Hent min lokasjon
    </button>
  </div>
</template>

<style scoped>
.geo-button {
  margin-top: 1rem;
  font-size: 12px;
}
</style>
