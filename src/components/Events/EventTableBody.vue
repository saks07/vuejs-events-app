<script setup lang="ts">
import { computed, type PropType } from 'vue'
import type { AdEvent } from '@/types/ad-event.type'
import EventTableRow from './EventTableRow.vue'

// PROPS
const props = defineProps({
  events: {
    type: Array as PropType<AdEvent[]>,
    default: () => {
      return []
    },
  },
  colWidth: {
    type: Number,
    default: 6,
  },
})

// EMITS
const emit = defineEmits<{ 'delete-event': [id: number, index: number] }>()

// METHODS
const handleDeleteEvent = (eventId: number, eventIndex: number): void => {
  emit('delete-event', eventId, eventIndex)
}

// COMPUTED
const eventRowCount = computed<string>(() =>
  props.events.length ? `${100 / props.colWidth}%` : '0',
)
</script>

<template>
  <div v-if="props.events.length" class="table-body">
    <EventTableRow
      v-for="(eventItem, index) in props.events"
      :key="`td_${eventItem.id}`"
      :event-index="index"
      :event-data="eventItem"
      :col-count="eventRowCount"
      @delete-event="handleDeleteEvent"
    />
  </div>
  <div v-else class="no-events-message">No events found</div>
</template>

<style scoped>
.no-events-message {
  position: relative;
  width: 100%;
  text-align: center;
}
</style>
