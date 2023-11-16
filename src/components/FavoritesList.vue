<script setup>
import { useRouter } from 'vue-router'
import IconDelete from './icons/IconDelete.vue'
import IconHome from './icons/IconHome.vue'
import IconForwards from './icons/IconForwards.vue'

const router = useRouter()

defineProps({
  addedLocations: {
    type: Array,
    required: true
  }
})
const handleOpenDetailedView = (addedLocation) => {
  router.push('/details/' + addedLocation.id)
}
const emit = defineEmits(['deleteLocation'])
const deleteLocation = (id) => {
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
      <div class="data-left-block">
        <h2>
          {{ addedLocation.locationName }}
          <IconHome v-if="addedLocation?.home" />
        </h2>
        <span> Effektiv temp: {{ Math.round(addedLocation.current.apparent_temperature) }}°C </span>
      </div>
      <div class="data-mid-block">
        <div class="data-mid-text">{{ Math.round(addedLocation.current.temperature_2m) }}°C</div>
      </div>
      <div class="data-right-block">
        <button
          class="delete-button"
          @click.stop="deleteLocation(addedLocation.id)"
          tabindex="0"
          aria-label="Slett lokasjonen"
        >
          <IconDelete />
        </button>
        <button
          class="enter-button"
          @click.stop="handleOpenDetailedView(addedLocation)"
          tabindex="0"
        >
          <span> Detaljer </span>
          <IconForwards />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.delete-button {
  position: relative;
}

.data-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.data-summarized {
  position: relative;
  min-width: 50%;
  padding: 1rem;
  margin: 1rem 0rem;
  font-weight: 500;
  border: 1px solid var(--detail-border-color);
  display: grid;
  grid-template-columns: 4fr 3fr 1fr;
  align-items: center;
  min-height: 6.9rem;
}
@media (max-width: 800px) {
  .data-summarized {
    width: 80vw;
  }
}
@media (max-width: 450px) {
  .enter-button {
    bottom: 0.5rem !important;
  }
}

.data-mid-text {
  font-size: 3.5rem;
  transform: translateY(3px);
  font-weight: 600;
  text-align: end;
  width: 6.5rem;
}
.data-right-block {
  min-width: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: end;
}

button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
}
.delete-button {
  position: absolute;
  top: 1rem;
  right: 0.95rem;
}

.delete-button:hover {
  box-shadow: 0 -1px 0 var(--button-hover) inset;
}

.enter-button {
  position: absolute;
  bottom: 1.5rem;
  display: flex;
  align-items: center;
}

.enter-button:hover {
  box-shadow: 0 -1px 0 var(--button-hover) inset;
}
.enter-button:focus {
  box-shadow: 0 -1px 0 var(--button-hover) inset;
}
.enter-button span {
  margin-right: 0.5rem;
}

.data-summarized:hover {
  background-color: var(--color-hover);
  cursor: pointer;
}
</style>
