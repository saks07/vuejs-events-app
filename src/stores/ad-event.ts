import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useHttp } from '@/composables/http.composable'
import type { AdEvent, FormDataEvent } from '@/types/ad-event.type'
import type { Result } from '@/types/app.type'

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
    try {
      const result = await getReq<Result<AdEvent[]>>(endpoints.getEvents)
      if (result.data) {
        setStateEvents(result.data)
        return
      }

      setStateEvents([])
    } catch (err: unknown) {
      console.error(err)
      setStateEvents([])
    }
  }

  const getEvent = async (id: string): Promise<void> => {
    try {
      if (!id || !Number(id)) {
        throw new Error('Missing or invalid id')
      }

      const result = await getReq<Result<AdEvent>>(
        endpoints.getEvent.replace('{id}', id),
      )
      if (result.data) {
        setStateEvent(result.data)
        return
      }

      setStateEvent(null)
    } catch (err: unknown) {
      console.error(err)
      setStateEvent(null)
    }
  }

  const createEvent = async (body: FormDataEvent): Promise<void> => {
    try {
      const result = await postReq<Result<AdEvent>>(endpoints.createEvent, body)
      if (result.data) {
        setStateNewEvent(result.data)
        return
      }

      setStateNewEvent(null)
    } catch (err: unknown) {
      console.error(err)
      setStateNewEvent(null)
    }
  }

  const updateEvent = async (
    id: string,
    body: FormDataEvent,
  ): Promise<void> => {
    try {
      if (!id || !Number(id)) {
        throw new Error('Missing or invalid id')
      }

      const result = await patchReq<Result<AdEvent>>(
        endpoints.updateEvent.replace('{id}', id),
        body,
      )
      if (result.data) {
        setStateUpdatedEvent(result.data)
        return
      }

      setStateUpdatedEvent(null)
    } catch (err: unknown) {
      console.error(err)
      setStateUpdatedEvent(null)
    }
  }

  const deleteEvent = async (id: number): Promise<void> => {
    try {
      if (!id || !Number(id)) {
        throw new Error('Missing or invalid id')
      }

      const result = await deleteReq<Result<AdEvent>>(
        endpoints.deleteEvent.replace('{id}', id.toString()),
      )
      if (result.data) {
        setStateDeletedEvent(result.data)
        return
      }

      setStateDeletedEvent(null)
    } catch (err: unknown) {
      console.error(err)
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
