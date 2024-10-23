<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import AppButton from '../App/AppButton.vue'
import AppLinkButton from '../App/AppLinkButton.vue'
import { AppButtonEnum } from '@/enum/app.enum'
import type { AdEvent } from '@/types/ad-event.type'

// PROPS
const props = defineProps({
  eventData: {
    type: Object as PropType<AdEvent>,
    required: true,
  },
  eventIndex: {
    type: Number,
    required: true,
  },
  colCount: {
    type: String,
    default: '0',
  },
})

// EMITS
const emit = defineEmits<{ 'delete-event': [id: number, index: number] }>()

// DATA
const showDeleteConfirmation = ref<boolean>(false)

// METHODS
const openCloseConfirmation = (): void => {
  showDeleteConfirmation.value = !showDeleteConfirmation.value
}

const deleteEvent = (): void => {
  emit('delete-event', props.eventData.id, props.eventIndex)
}

// COMPUTED
const eventDesctiptionCheck = computed<string>(() =>
  !props.eventData.description
    ? 'no description available'
    : props.eventData.description,
)

const colWidth = computed<string>(() => props.colCount)
</script>

<template>
  <div :class="['table-row', `tr-${props.eventData.id}`]">
    <div class="td-event td-id">{{ props.eventData.id }}</div>
    <div class="td-event td-name">{{ props.eventData.name }}</div>
    <div class="td-event td-desc">
      {{ eventDesctiptionCheck }}
    </div>
    <div class="td-event td-type">{{ props.eventData.type }}</div>
    <div class="td-event td-priority">{{ props.eventData.priority }}</div>
    <div class="td-event td-commands">
      <AppLinkButton :to="`/edit/${props.eventData.id}`" :text="'edit'" />
      <AppButton
        :type="AppButtonEnum.BUTTON"
        :text="'delete'"
        @app-button-click="openCloseConfirmation"
      />
    </div>
    <div v-show="showDeleteConfirmation" class="delete-confirmation-container">
      Confirm event delete?
      <div class="delete-buttons-container">
        <AppButton
          :type="AppButtonEnum.BUTTON"
          :text="'yes'"
          @app-button-click="deleteEvent"
        />
        <AppButton
          :type="AppButtonEnum.BUTTON"
          :text="'no'"
          @app-button-click="openCloseConfirmation"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-row {
  display: flex;
  justify-content: space-between;
  background-color: var(--bg-color-white);
  border-radius: var(--border-radius);
  text-align: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  margin-block: 2rem;
  flex-wrap: wrap;
  overflow: hidden;
  align-items: center;
}

.td-event {
  padding: 0.8rem 1.6rem;
  width: v-bind(colWidth);
  font-size: clamp(1.2rem, 0.75vw, 1.6rem);
}

.td-commands {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

.delete-confirmation-container {
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--border-color-default);
}

.delete-buttons-container {
  margin-inline-start: 1rem;
}

.delete-buttons-container > * {
  margin-inline: 0.5rem;
}

@media (max-width: 576px) {
  .td-commands {
    width: 100%;
    background-color: var(--color-black-50);
  }
}
</style>
