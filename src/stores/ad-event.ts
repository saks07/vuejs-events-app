import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useHttp } from '@/composables/http.composable'
import type { AdEvent, FormDataEvent } from '@/types/ad-event.type'

const HOST = import.meta.env.VITE_API_BASE_URL
const endpoints = {
  getEvents: `${HOST}/events`,
  getEvent: `${HOST}/events/{id}`,
  createEvent: `${HOST}/events`,
  updateEvent: `${HOST}/events/{id}`,
  deleteEvent: `${HOST}/events/{id}`,
}

const { getReq, postReq, patchReq, deleteReq } = useHttp()

export const useAdEventStore = defineStore('ad-event', () => {
  // STATE
  const events = ref<AdEvent[]>([])
  const event = ref<AdEvent | null>(null)
  const newEvent = ref<AdEvent | null>(null)
  const updatedEvent = ref<AdEvent | null>(null)
  const deletedEvent = ref<AdEvent | null>(null)

  // ACTIONS
  const getEvents = async (): Promise<void> => {
    const result = await getReq<AdEvent[]>(endpoints.getEvents)

    if (result.data) {
      setStateEvents(result.data)
    } else {
      setStateEvents([])
    }
  }

  const getEvent = async (id: string): Promise<void> => {
    if (!id || !Number(id)) {
      throw new Error('Missing id')
    }
    const result = await getReq<AdEvent>(endpoints.getEvent.replace('{id}', id))
    if (result.data) {
      setStateEvent(result.data)
    } else {
      setStateEvent(null)
    }
  }

  const createEvent = async (body: FormDataEvent): Promise<void> => {
    const result = await postReq<AdEvent>(endpoints.createEvent, body)
    if (result.data) {
      setStateNewEvent(result.data)
    } else {
      setStateNewEvent(null)
    }
  }

  const updateEvent = async (
    id: string,
    body: FormDataEvent,
  ): Promise<void> => {
    if (!id || !Number(id)) {
      throw new Error('Missing id')
    }
    const result = await patchReq<AdEvent>(
      endpoints.updateEvent.replace('{id}', id),
      body,
    )

    if (result.data) {
      setStateUpdatedEvent(result.data)
    } else {
      setStateUpdatedEvent(null)
    }
  }

  const deleteEvent = async (id: number): Promise<void> => {
    if (!id || !Number(id)) {
      throw new Error('Missing id')
    }
    const result = await deleteReq<AdEvent>(
      endpoints.deleteEvent.replace('{id}', id.toString()),
    )
    if (result.data) {
      setStateDeletedEvent(result.data)
    } else {
      setStateDeletedEvent(null)
    }
  }

  // MUTATIONS
  const setStateEvents = (value: AdEvent[]) => {
    events.value = value
  }

  const setStateEvent = (value: AdEvent | null) => {
    event.value = value
  }

  const setStateNewEvent = (value: AdEvent | null) => {
    newEvent.value = value
  }

  const setStateUpdatedEvent = (value: AdEvent | null) => {
    updatedEvent.value = value
  }

  const setStateDeletedEvent = (value: AdEvent | null) => {
    deletedEvent.value = value
  }

  // GETTERS
  const stateEvents = computed<AdEvent[]>(() => events.value)

  const stateEvent = computed<AdEvent | null>(() => event.value)

  const stateNewEvent = computed<AdEvent | null>(() => newEvent.value)

  const stateUpdatedEvent = computed<AdEvent | null>(() => updatedEvent.value)

  const stateDeletedEvent = computed<AdEvent | null>(() => deletedEvent.value)

  return {
    getEvents,
    setStateEvents,
    stateEvents,
    getEvent,
    stateEvent,
    createEvent,
    stateNewEvent,
    updateEvent,
    stateUpdatedEvent,
    deleteEvent,
    stateDeletedEvent,
  }
})
