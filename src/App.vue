<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>
  <div class="main-container">
    <HeaderComponent />
    <RouterView />
  </div>
  <FooterComponent />
</template>

<style scoped></style>
