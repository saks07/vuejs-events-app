<script setup lang="ts">
// PROPS
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  asButton: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <RouterLink :to="props.to" :class="['app-link-button']">{{
    props.text
  }}</RouterLink>
</template>

<style scoped>
.app-link-button {
  position: relative;
  color: var(--primary-color);
  text-transform: capitalize;

  transition: color 0.3s ease-in;
}

.app-link-button:hover {
  color: var(--primary-color-500);
}
</style>
