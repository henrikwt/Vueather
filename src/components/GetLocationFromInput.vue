<script setup>
import { ref } from 'vue';

  const reverseGeoCoding = async (latitude, longitude) => {
    // const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&location_type=ROOFTOP&result_type=street_address&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`);
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&location_type=APPROXIMATE&result_type=locality&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`);
    const data = await response.json();
    // Handle error
    console.log("name");
    console.log(data);
    if (data?.results[0]?.formatted_address) {
      return data.results[0].formatted_address
    }
    return null;
  }

  const geoCoding = async (address) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`);
    return await response.json();
  }

  const emit = defineEmits(['locationFetched']);

  const fetchWeatherData = async (latitude, longitude, timezone) => {
    // const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=${timezone}&forecast_days=1`);
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,rain&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=${timezone}`);
    return await response.json();
  }

  const getGeoLocation = async () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const weatherData = await fetchWeatherData(position.coords.latitude, position.coords.longitude, timezone);
          const locationName = await reverseGeoCoding(position.coords.latitude, position.coords.longitude)
          weatherData.locationName = locationName;
          emit('locationFetched', weatherData);
        },
        error => {
          console.log(error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  const location = ref('');
  const handleSubmit = async () => {
    const locationData = await geoCoding(location.value);
    console.log(locationData);
    console.log("THE DATA ABOIVE");
    if (locationData?.results !== undefined && locationData?.results.length !== 0) {
        const locationName = locationData.results[0].formatted_address;
        const coordinates = locationData.results[0].geometry.location;
        // Should this be the timezone of the location?
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const weatherData = await fetchWeatherData(coordinates.lat, coordinates.lng, timezone)
        weatherData.locationName = locationName;
        emit('locationFetched', weatherData);
    } else {
        console.log("location not found")
    }
  }
</script>

<template>

  <form id="location-form-id" @submit.prevent="handleSubmit">
    <div>
        <label for="location-input-id">Lokasjon</label>
        <input v-model="location" type="text" id="location-input-id" placeholder="Skriv inn en lokasjon..." required/>
        <button type="submit">Legg til lokasjon</button>
    </div>
  </form>

</template>
