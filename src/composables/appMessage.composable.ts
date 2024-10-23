import { AppMessageType } from '@/enum/app.enum'
import { ref } from 'vue'

export function useAppMessage() {
  const type = ref<AppMessageType>(AppMessageType.INFO)
  const text = ref<string>('')

  const setMessage = (typeVal: AppMessageType, textVal: string): void => {
    type.value = typeVal
    text.value = textVal
  }

  return {
    type,
    text,
    setMessage,
  }
}
