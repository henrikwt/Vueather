<script setup>
    // const props = defineProps({
    //     addedLocations: {
    //         type: Array,
    //         required: true
    //     }
    // })
    // const handleOpenDetailedView = (id) => {
    //     console.log('Open detailed view');
    //     console.log(id);
    // }
    import { useRouter, useRoute } from 'vue-router'
    import { computed } from 'vue';
    const router = useRouter()
    const route = useRoute()
    const dataId = computed(() => {
        return route.params.id
    })
    console.log(route.params.id);
</script>

<template>

    <div>
        <h1>User {{ $route.params.id }}</h1>
        HELLLO
    </div>

</template>

<!-- Todo: 
        1.  Make dynamic routes per favorite 
        2.  Use the google map api to get location from place. (Does not necessarily need autocomplete, but make it easy to use)
        3.  Make geolocation button not show if it's been clicked.
        4.  If possible use their npm package for buttons etc.
        5.  Display name of location, and current temp on the summary
        6.  Display the other info on the detailed view, maybe make the elements addable/removable. 
        Possibility: Do a small fetch for the front page, then each time you click on a location, do a fetch for that location.
                     Then just do a minute interval fetch for the front page.

-->
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