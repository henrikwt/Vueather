<script setup>

    const props = defineProps({
        addedLocations: {
            type: Array,
            required: true
        }
    })
    const handleOpenDetailedView = (id) => {
        console.log('Open detailed view');
        console.log(id);
        // router.push('/details/' + id)
    }
    const emit = defineEmits(['deleteLocation']);
    const deleteLocation = (id) => {
        console.log('Delete location');
        console.log(id);
        emit('deleteLocation', id);
    }
</script>

<template>

    <div>
        <div v-for="addedLocation in addedLocations" class="data-summarized" @click="$event => handleOpenDetailedView(addedLocation.id)" :key="addedLocation.id">
            <h2>{{ addedLocation.locationName }}</h2> 
            Temp: {{ Math.round(addedLocation.current.temperature_2m) }}°C, Effektiv temp: {{ addedLocation.current.apparent_temperature }}
            <button @click="deleteLocation(addedLocation.id)">Slett</button>
        </div>
    </div>

</template>

<style scoped>
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