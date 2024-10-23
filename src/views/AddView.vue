<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import EventForm from '@/components/Events/EventForm.vue'
import type { FormDataEvent } from '@/types/ad-event.type'
import { useAdEventStore } from '@/stores/ad-event'
import { useUserStore } from '@/stores/user'
import { AdsOptions, IpAPIFields } from '@/enum/user.enum'
import AppMessage from '@/components/App/AppMessage.vue'
import { useAppMessage } from '@/composables/appMessage.composable'
import { AppMessageType } from '@/enum/app.enum'
import IconArrowLeft from '@/components/Icons/IconArrowLeft.vue'

const eventStore = useAdEventStore()
const userStore = useUserStore()
const appMessage = useAppMessage()

// DATA
const formSubmitting = ref<boolean>(false)

// LIFECYCLE HOOKS
onMounted(async () => {
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

  await eventStore.createEvent(formData)

  setFormSubmitting(false)

  // Handle response error
  if (!eventStore.stateNewEvent) {
    appMessage.setMessage(AppMessageType.ERROR, 'An error occured')
    return
  }

  // Handle response success
  appMessage.setMessage(AppMessageType.SUCCESS, 'Event successfully created')
}

// COMPUTED
const canSelectAds = computed<boolean>(
  () => userStore.stateAds?.ads === AdsOptions.YES,
)
</script>

<template>
  <div class="container add-page">
    <div class="wrapper">
      <div class="form-container">
        <h1 class="form-title">
          <RouterLink :to="{ name: 'HomeView' }" class="back-button">
            <IconArrowLeft :width="32" :height="32" />
          </RouterLink>
          add event
        </h1>
        <EventForm
          :form-id="'addForm'"
          :button-text="'add event'"
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
