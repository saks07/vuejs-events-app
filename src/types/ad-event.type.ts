import { EventTypeEnum } from '@/enum/ad-event.enum'

export type FormDataEvent = {
  name: string
  description: string
  priority: string
  type: EventTypeEnum
}

export type EventTypes = { value: EventTypeEnum; label: string }

type AdEventType =
  | EventTypeEnum.ADS
  | EventTypeEnum.APP
  | EventTypeEnum.CROSSPROMO
  | EventTypeEnum.LIVEOPS

export type AdEvent = {
  id: number
  name: string
  description: string
  type: AdEventType
  priority: number
}
