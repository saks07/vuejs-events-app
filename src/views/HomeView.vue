<script setup lang="ts">
import { useAdEventStore } from '@/stores/ad-event'
import { computed, onMounted } from 'vue'
import EventTableHeading from '@/components/Events/EventTableHeading.vue'
import EventTableBody from '@/components/Events/EventTableBody.vue'
import AppLinkButton from '@/components/App/AppLinkButton.vue'
import type { AdEvent } from '@/types/ad-event.type'
import AppMessage from '@/components/App/AppMessage.vue'
import { AppMessageType } from '@/enum/app.enum'
import { EventHeadingsEnum } from '@/enum/ad-event.enum'
import { useAppMessage } from '@/composables/appMessage.composable'

const eventStore = useAdEventStore()
const appMessage = useAppMessage()

// LIFECYCLE METHODS
onMounted(async () => {
  await eventStore.getEvents()
})

// METHODS
const getHeadings = (): EventHeadingsEnum[] => {
  return [
    EventHeadingsEnum.ID,
    EventHeadingsEnum.NAME,
    EventHeadingsEnum.DESCRIPTION,
    EventHeadingsEnum.TYPE,
    EventHeadingsEnum.PRIORITY,
    EventHeadingsEnum.COMMANDS,
  ]
}

const handleDeleteEvent = async (
  eventId: number,
  eventIndex: number,
): Promise<void> => {
  await eventStore.deleteEvent(eventId)

  if (eventStore.stateDeletedEvent === null) {
    appMessage.setMessage(AppMessageType.ERROR, 'An error occured')
  } else {
    appMessage.setMessage(AppMessageType.SUCCESS, 'Event successfully deleted')
    updateEventsAfterDelete(eventIndex)
  }
}

const updateEventsAfterDelete = (eventIndex: number): void => {
  const currentEvents = events.value
  currentEvents.splice(eventIndex, 1)
  eventStore.setStateEvents(currentEvents)
}

// COMPUTED
const events = computed<AdEvent[]>(() => eventStore.stateEvents)

const columnWidth = computed<number>(() => getHeadings().length)
</script>

<template>
  <main class="container home-main">
    <div class="wrapper">
      <div class="actions-container">
        <AppLinkButton :to="'/add'" :text="'add event'" />
      </div>
      <div v-if="appMessage.text.value" class="message-container">
        <AppMessage
          :app-message-type="appMessage.type.value"
          :app-message-text="appMessage.text.value"
        />
      </div>
      <div class="table-container">
        <EventTableHeading :headings="getHeadings()" :col-width="columnWidth" />
        <EventTableBody
          :events="events"
          :col-width="columnWidth"
          @delete-event="handleDeleteEvent"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.actions-container {
  position: relative;
  margin-block: 4rem;
  background-color: var(--bg-color-white);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
</style>
