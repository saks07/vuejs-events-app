<script setup lang="ts">
import { AppMessageType } from '@/enum/app.enum'
import type { PropType } from 'vue'

// PROPS
const props = defineProps({
  appMessageType: {
    type: String as PropType<AppMessageType>,
    default: AppMessageType.INFO,
  },
  appMessageText: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    :class="['app-message-container', `app-message-${props.appMessageType}`]"
  >
    <div class="wrapper">
      <div class="message">{{ props.appMessageText }}</div>
    </div>
  </div>
</template>

<style scoped>
.app-message-container {
  position: relative;
  padding: 1rem 1.6rem;
  border-radius: var(--border-radius);
  text-align: center;
}

.app-message-container.message-actions {
  padding: 2.4rem 2.8rem;
}

.message-close-btn {
  position: absolute;
  top: 0;
  right: 0;
  color: var(--color-white);
  text-transform: capitalize;
  font-size: 1.2rem;
  border-radius: 0 0 0 var(--border-radius);
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.app-message-info {
  border: 2px solid var(--message-info-border-color);
  background-color: var(--message-info-bg);
  color: var(--message-info-color);
}

.app-message-info .message-close-btn {
  background-color: var(--message-info-border-color);
}

.app-message-success {
  border: 2px solid var(--message-success-border-color);
  background-color: var(--message-success-bg);
  color: var(--message-success-color);
}

.app-message-success .message-close-btn {
  background-color: var(--message-success-border-color);
}

.app-message-warning {
  border: 2px solid var(--message-warning-border-color);
  background-color: var(--message-warning-bg);
  color: var(--message-warning-color);
}

.app-message-warning .message-close-btn {
  background-color: var(--message-warning-border-color);
}

.app-message-error {
  border: 2px solid var(--message-error-border-color);
  background-color: var(--message-error-bg);
  color: var(--message-error-color);
}

.app-message-error .message-close-btn {
  background-color: var(--message-error-border-color);
}

.buttons-container {
  margin-top: 1.6rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
