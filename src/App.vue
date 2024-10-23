<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderMain from './components/Header/HeaderMain.vue'
import FooterMain from './components/Footer/FooterMain.vue'
</script>

<template>
  <HeaderMain />
  <RouterView />
  <FooterMain />
</template>
