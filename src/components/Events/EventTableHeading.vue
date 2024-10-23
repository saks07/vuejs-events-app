<script setup lang="ts">
import { computed, type PropType } from 'vue'

// PROPS
const props = defineProps({
  headings: {
    type: Array as PropType<string[]>,
    required: true,
  },
  colWidth: {
    type: Number,
    default: 6,
  },
})

// COMPUTED
const headingsCount = computed<string>(() => `${100 / props.colWidth}%`)
</script>

<template>
  <div class="table-heading">
    <div
      v-for="heading in props.headings"
      :key="`th_${heading}`"
      :class="['th-event', `th-${heading}`]"
    >
      {{ heading }}
    </div>
  </div>
</template>

<style scoped>
.table-heading {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: var(--primary-color);
  color: var(--color-white);
  border-radius: var(--border-radius);
  text-align: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  margin-block: 2rem;
  overflow: hidden;
}

.th-event {
  padding: 0.8rem;
  width: v-bind(headingsCount);
  text-transform: uppercase;
  font-size: clamp(1.2rem, 0.75vw, 1.6rem);
}

@media (max-width: 576px) {
  .th-commands {
    width: 100%;
    background-color: var(--color-black-100);
  }
}
</style>
