<script setup lang="ts">
import { AppButtonEnum } from '@/enum/app.enum'
import type { PropType } from 'vue'

// PROPS
const props = defineProps({
  type: {
    type: String as PropType<AppButtonEnum>,
    default: AppButtonEnum.BUTTON,
  },
  text: {
    type: String,
    default: 'button',
  },
  classes: {
    type: Array as PropType<string[]>,
    default: () => {
      return []
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

// EMITS
const emit = defineEmits<{ 'app-button-click': [Event] }>()

// METHODS
const appButtonClick = (event: Event): void => {
  emit('app-button-click', event)
}
</script>

<template>
  <button
    :type="props.type"
    @click="appButtonClick"
    :class="['app-button', ...props.classes]"
  >
    {{ props.text }}
  </button>
</template>

<style scoped>
.app-button {
  position: relative;
  background-color: var(--primary-color);
  color: var(--color-white);
  border: 0;
  padding: 0;
  cursor: pointer;
  padding: 0.8rem 1.6rem;
  border-radius: var(--border-radius);
  text-transform: capitalize;

  transition: background-color 0.3s ease-in;
}

.app-button.full-width {
  width: 100%;
}

.app-button:hover {
  background-color: var(--primary-color-500);
}
</style>
