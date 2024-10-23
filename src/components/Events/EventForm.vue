<script setup lang="ts">
import { ref, type PropType, computed, watch, onMounted } from 'vue'
import type { FormDataEvent, EventTypes, AdEvent } from '@/types/ad-event.type'
import { EventTypeEnum } from '@/enum/ad-event.enum'
import type { VueformComponent } from '@vueform/vueform'

// PROPS
const props = defineProps({
  formId: {
    type: String,
    default: '',
  },
  eventData: {
    type: Object as PropType<AdEvent | null>,
    default: () => {
      return null
    },
  },
  buttonText: {
    type: String,
    default: 'form button',
  },
  adsSelectable: {
    type: Boolean,
    default: false,
  },
  isSubmitting: {
    type: Boolean,
    default: false,
  },
})

// EMITS
const emit = defineEmits<{ 'event-data-submit': [FormDataEvent] }>()

// DATA
const eventTypesArr = ref<EventTypes[]>([
  { value: EventTypeEnum.ADS, label: 'ads' },
  { value: EventTypeEnum.APP, label: 'app' },
  { value: EventTypeEnum.CROSSPROMO, label: 'cross promo' },
  { value: EventTypeEnum.LIVEOPS, label: 'live ops' },
])
const eventForm = ref<VueformComponent>()

// LIFECYCLE HOOKS
onMounted(() => {
  setInputValues(props.eventData)
})

// METHODS
const onEventDataSubmit = (form$: VueformComponent): void => {
  emit('event-data-submit', form$.data as unknown as FormDataEvent)
}

const setInputValues = (eventData: AdEvent | null): void => {
  eventForm.value?.el$('name').update(eventData?.name ?? '')
  eventForm.value?.el$('description').update(eventData?.description ?? '')
  eventForm.value?.el$('type').update(eventData?.type ?? EventTypeEnum.EMPTY)
  eventForm.value?.el$('priority').update(eventData?.priority ?? '')
}

// COMPUTED
const eventTypesFilter = computed<EventTypes[]>(() => {
  if (props.adsSelectable) {
    return eventTypesArr.value
  }

  return eventTypesArr.value.filter(item => item.value !== EventTypeEnum.ADS)
})

// WATCH
watch(
  () => props.eventData,
  value => {
    setInputValues(value)
  },
)
</script>

<template>
  <Vueform
    ref="eventForm"
    @submit="onEventDataSubmit"
    :endpoint="false"
    :display-errors="false"
    :loading="props.isSubmitting"
  >
    <TextElement
      name="name"
      label="Name"
      id="eventName"
      :attrs="{ autofocus: true }"
      :rules="['required', 'min:2', 'max:50']"
    />
    <TextareaElement
      name="description"
      label="Description"
      id="eventDescription"
    />
    <SelectElement
      name="type"
      label="Type"
      :native="false"
      :items="eventTypesFilter"
      id="eventType"
      :rules="['required']"
    />
    <TextElement
      name="priority"
      input-type="number"
      label="Priority"
      :rules="['required']"
      :attrs="{ max: 10, min: 0 }"
    />
    <ButtonElement
      name=""
      :button-type="'button'"
      :button-label="props.buttonText"
      :full="true"
      :submits="true"
    ></ButtonElement>
  </Vueform>
</template>

<style>
.form-input-container {
  position: relative;
  width: 100%;
  margin-block: 1rem;
}

.vf-label {
  position: relative;
  display: inline-block;
  width: 100%;
  text-transform: capitalize;
  font-size: 1.2rem;
}

.vf-input-field,
.vf-multiselect {
  --vf-radius-input: var(--border-radius);
  --vf-py-input: 0.8rem;
  --vf-px-input: 1.6rem;
}

.vf-input-group.vf-input-group-danger,
.vf-multiselect.vf-multiselect-danger {
  border-color: var(--vf-color-danger) !important;
}

.vf-multiselect-wrapper {
  --vf-radius-input: var(--border-radius);
  padding-block: 0.8rem;
}

.vf-btn {
  --vf-primary: var(--primary-color);
  --vf-font-size: 1.4rem;
  --vf-py-btn: 0.8rem;
  --vf-px-btn: 1.6rem;

  text-transform: uppercase;
}
</style>
