<script setup lang="ts">
import AppMessage from '@/components/App/AppMessage.vue'
import EventForm from '@/components/Events/EventForm.vue'
import { useAppMessage } from '@/composables/appMessage.composable'
import { AppMessageType } from '@/enum/app.enum'
import { AdsOptions, IpAPIFields } from '@/enum/user.enum'
import { useAdEventStore } from '@/stores/ad-event'
import { useUserStore } from '@/stores/user'
import type { AdEvent, FormDataEvent } from '@/types/ad-event.type'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import IconArrowLeft from '@/components/Icons/IconArrowLeft.vue'

const route = useRoute()
const router = useRouter()
const eventStore = useAdEventStore()
const userStore = useUserStore()
const appMessage = useAppMessage()

// DATA
const formSubmitting = ref<boolean>(false)

// LIFECYCLE HOOKS
onMounted(async () => {
  await router.isReady()
  eventStore.getEvent(route.params.id as string)

  await userStore.getGeolocation([IpAPIFields.COUNTRY_CODE])
  userStore.getAdsData(userStore.stateGeolocation?.countryCode ?? '')
})

// METHODS
const setFormSubmitting = (value: boolean): void => {
  formSubmitting.value = value
}

const handleEventDataSubmit = async (
  formData: FormDataEvent,
): Promise<void> => {
  appMessage.setMessage(AppMessageType.INFO, '')
  setFormSubmitting(true)

  await eventStore.updateEvent(route.params.id as string, formData)

  setFormSubmitting(false)

  // Handle response error
  if (!eventStore.stateUpdatedEvent) {
    appMessage.setMessage(AppMessageType.ERROR, 'An error occured')
    return
  }

  // Handle response success
  appMessage.setMessage(AppMessageType.SUCCESS, 'Event successfully updated')
}

// COMPUTED
const eventData = computed<AdEvent | null>(() => eventStore.stateEvent)

const canSelectAds = computed<boolean>(
  () => userStore.stateAds?.ads === AdsOptions.YES,
)
</script>

<template>
  <div class="container edit-page">
    <div class="wrapper">
      <div class="form-container">
        <h1 class="form-title">
          <RouterLink :to="{ name: 'HomeView' }" class="back-button">
            <IconArrowLeft :width="32" :height="32" />
          </RouterLink>
          edit event
        </h1>
        <EventForm
          :form-id="'editForm'"
          :event-data="eventData"
          :button-text="'edit event'"
          :ads-selectable="canSelectAds"
          :is-submitting="formSubmitting"
          @event-data-submit="handleEventDataSubmit"
        />
        <div v-if="appMessage.text.value" class="form-submit-result">
          <AppMessage
            :app-message-type="appMessage.type.value"
            :app-message-text="appMessage.text.value"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
}

.form-container {
  position: relative;
  max-width: 384px;
  background-color: var(--bg-color-white);
  padding: 2rem;
  border-radius: var(--border-radius);
  margin-block-start: 4rem;
  width: 100%;
}

.form-title {
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
  text-align: center;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-button {
  position: absolute;
  left: 0;
}

.form-submit-result {
  margin-block-start: 2rem;
}
</style>
