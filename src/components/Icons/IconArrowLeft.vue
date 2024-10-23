<script setup lang="ts">
const props = defineProps({
  width: Number,
  height: Number,
})
</script>

<template>
  <svg
    enable-background="new 0 0 32 32"
    :height="props.height"
    version="1.1"
    viewBox="0 0 32 32"
    :width="props.width"
    xml:space="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <path
      d="M25.002,16c0,0.5522-0.4473,1-1,1H9.8672l4.9629,7.4453c0.3066,0.4595,0.1826,1.0806-0.2773,1.3867   C14.3818,25.9458,14.1895,26,13.999,26c-0.3232,0-0.6406-0.1563-0.833-0.4453L6.7959,16l6.3701-9.5547   c0.3057-0.46,0.9248-0.5845,1.3867-0.2773c0.46,0.3062,0.584,0.9272,0.2773,1.3867L9.8672,15H24.002   C24.5547,15,25.002,15.4478,25.002,16z"
    />
  </svg>
</template>
