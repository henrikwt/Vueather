<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import IconBack from './icons/IconBack.vue';
import IconHome from './icons/IconHome.vue';
import IconDelete from './icons/IconDelete.vue';

const router = useRouter()
const route = useRoute()
const dataId = computed(() => {
  return route.params.id
})

const getDataFromLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem('locations'))
  let currentData
  localStorageData.forEach((element) => {
    if (element.id == route.params.id) {
      currentData = element
    }
  })
  return currentData
}



const selectedWeatherData = getDataFromLocalStorage()
console.log(selectedWeatherData)

const location = selectedWeatherData.locationName
const temperature = Math.round(selectedWeatherData.current.temperature_2m)
const apparentTemperature = Math.round(selectedWeatherData.current.apparent_temperature)
const rain = Math.round(selectedWeatherData.current.rain)
const todayHighest = Math.round(selectedWeatherData.daily.temperature_2m_max[0]);
const todayLowest = Math.round(selectedWeatherData.daily.temperature_2m_min[0]);

</script>

<template>
  <div class="details-container">
    <!-- <h2>{{ $route.params.id }}</h2> -->
    <RouterLink to="/">
        <IconBack />
    </RouterLink>
    <h2>{{ location }}
      <IconHome v-if="selectedWeatherData?.home"/>
    </h2>
    <div class="parameter-block">Temp: {{ temperature }}°C</div>
    <div class="parameter-block">Effektiv temp: {{ apparentTemperature }}°C</div>
    <div class="parameter-block">Høyest: {{ todayHighest }}°C</div>
    <div class="parameter-block">Lavest: {{ todayLowest }}°C</div>
    <div class="parameter-block">Regn: {{ rain }}mm</div>
    
  </div>
</template>

<style scoped>
.parameter-block {
  background-color: #008ea6;
  border: 1px solid #000;
  padding: 1rem;
  margin: 1rem;
  font-size: 3rem;
}
.details-container {
  border: 1px solid #000;
  padding: 1rem;
  margin: 1rem;
  background-color: #009fe3;
}
.data-summarized {
  padding: 1rem;
  margin: 1rem;
  font-size: 1.5rem;
  border: 1px solid black;
}
.data-summarized:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}
</style>
