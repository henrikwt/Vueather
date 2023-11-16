<script setup>
import { useRoute } from 'vue-router'
import IconBack from '../components/icons/IconBack.vue'
import IconHome from '../components/icons/IconHome.vue'
import IconCloud from '../components/icons/IconCloud.vue'
import IconDrop from '../components/icons/IconDrop.vue'
import IconLeaf from '../components/icons/IconLeaf.vue'
import IconMoon from '../components/icons/IconMoon.vue'
import IconSun from '../components/icons/IconSun.vue'
import IconFlag from '../components/icons/IconFlag.vue'
import IconEarth from '../components/icons/IconEarth.vue'

const route = useRoute()

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
const weather = {
  location: selectedWeatherData.locationName,
  temp: Math.round(selectedWeatherData.current.temperature_2m),
  appTemp: Math.round(selectedWeatherData.current.apparent_temperature),
  rain: Math.round(selectedWeatherData.current.rain),
  todayHigh: Math.round(selectedWeatherData.daily.temperature_2m_max[0]),
  todayLow: Math.round(selectedWeatherData.daily.temperature_2m_min[0]),
  cloudy: Math.round(selectedWeatherData.current.cloud_cover),
  todaySunrise: selectedWeatherData.daily.sunrise[0].slice(11, 18),
  tomorrowSunrise: selectedWeatherData.daily.sunrise[1].slice(11, 18),
  todaySunset: selectedWeatherData.daily.sunset[0].slice(11, 18),
  tomorrowSunset: selectedWeatherData.daily.sunset[1].slice(11, 18),
  uvIndex: selectedWeatherData.daily.uv_index_max[0],
  wind: selectedWeatherData.current.wind_speed_10m
}
</script>

<template>
  <div class="details-wrapper">
    <div div class="details-container">
      <div class="details-header">
        <RouterLink to="/" aria-label="Gå tilbake">
          <IconBack class="icon-back" />
        </RouterLink>
        <h2>
          {{ weather.location }}
          <IconHome v-if="selectedWeatherData?.home" />
        </h2>
      </div>
      <div class="display">
        <div class="parameter-block">
          <div class="parameter-header">
            <IconLeaf class="icon" />
            Temperatur:
          </div>
          <div class="parameter-block-main">
            <div>
              <div>Nå: {{ weather.temp }}°C</div>
              <div>Føles som: {{ weather.appTemp }}°C</div>
            </div>
            <div>
              <div>Kaldest: {{ weather.todayLow }}°C</div>
              <div>Varmest: {{ weather.todayHigh }}°C</div>
            </div>
          </div>
        </div>
        <div class="double">
          <div class="parameter-block-square">
            <div class="parameter-header">
              <IconDrop class="icon" />
              Nedbør:
            </div>
            <div class="parameter-main">{{ weather.rain }} mm</div>
          </div>
          <div class="parameter-block-square">
            <div class="parameter-header">
              <IconCloud class="icon" />
              Skydekke:
            </div>
            <div class="parameter-main">{{ weather.cloudy }} %</div>
          </div>
        </div>
        <div class="double">
          <div class="parameter-block-square">
            <div class="parameter-header">
              <IconEarth class="icon" />
              UV-indeks:
            </div>
            <div class="parameter-main">
              {{ weather.uvIndex }}
            </div>
          </div>
          <div class="parameter-block-square">
            <div class="parameter-header">
              <IconFlag class="icon" />
              Vind
            </div>
            <div class="parameter-main">{{ weather.wind }} km/t</div>
          </div>
        </div>
        <div class="double">
          <div class="parameter-block-square">
            <div class="parameter-header">
              <IconSun class="icon" />
              Soloppgang:
            </div>
            <div class="parameter-main">
              {{ weather.todaySunrise }}
            </div>
          </div>
          <div class="parameter-block-square">
            <div class="parameter-header">
              <IconMoon class="icon" />
              Solnedgang:
            </div>
            <div class="parameter-main">
              {{ weather.todaySunset }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.double {
  display: flex;
  justify-content: space-between;
}

@media (max-width: 600px) {
  .double {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .parameter-block-square {
    width: 80vw !important;
  }
  .parameter-block-main {
    flex-direction: column;
  }
}

.parameter-main {
  font-size: 4rem;
  text-align: center;
}
.parameter-header {
  display: flex;
  gap: 0.5rem;
}

.parameter-block-main {
  display: flex;
  justify-content: space-evenly;
}
.parameter-block-main div {
  display: flex;
  flex-direction: column;
  font-size: 2rem;
}
.parameter-block-square {
  border: 2px solid var(--border-color);
  width: 48%;
  padding: 1rem;
  background-color: var(--color-background-details);
}
.parameter-block {
  border: 2px solid var(--border-color);
  padding: 1rem;
  background-color: var(--color-background-details);
}

.display {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.icon-back:hover {
  box-shadow: 0 -1px 0 var(--button-hover) inset;
}
.details-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}
.details-container {
  width: 80vw;
}

.details-wrapper {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  padding: 1rem 0 2rem;
  background-color: var(--color-text-soft);
}
</style>
