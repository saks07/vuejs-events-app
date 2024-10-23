import type { AdsOptions } from '@/enum/user.enum'

export type Ads = AdsOptions.YES | AdsOptions.NO

export type UserGeolocation = {
  countryCode: string
}

export type UserGeolocationQuery = {
  fields: string
}

export type Fun7Ad = {
  ads: Ads
}
