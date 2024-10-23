import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useHttp } from '@/composables/http.composable'
import { IpAPIFields } from '@/enum/user.enum'
import type { Fun7Ad, UserGeolocation } from '@/types/user.type'
import { useLocalStorage } from '@/composables/localStorage.composable'
import { LocalStorageKeys } from '@/enum/app.enum'

const HOST = import.meta.env.VITE_API_BASE_URL
const endpoints = {
  geolocation: `${HOST}/users/geolocation`,
  ads: `${HOST}/users/ads?countryCode=`,
}

const { getReq } = useHttp()
const { setLocalStorage, getLocalStorage } = useLocalStorage()

export const useUserStore = defineStore('user', () => {
  // STATE
  const geolocation = ref<UserGeolocation | null>(null)
  const ads = ref<Fun7Ad | null>(null)

  // ACTIONS
  const getGeolocation = async (
    filedsValues?: IpAPIFields[],
  ): Promise<void> => {
    const checkGeolocation = getLocalStorage(LocalStorageKeys.GEOLOCATION)
    if (checkGeolocation) {
      setStateGeolocation(JSON.parse(checkGeolocation))
      return
    }

    let baseUrl = endpoints.geolocation
    if (filedsValues) {
      baseUrl = `${baseUrl}?fields=${filedsValues.join(',')}`
    }
    const result = await getReq<UserGeolocation | null>(baseUrl)
    if (result.data) {
      setStateGeolocation(result.data)
      setLocalStorage(LocalStorageKeys.GEOLOCATION, JSON.stringify(result.data))
    } else {
      setStateGeolocation(null)
    }
  }

  const getAdsData = async (countryCode: string): Promise<void> => {
    if (!countryCode) {
      return
    }

    const checkAdsPermission = getLocalStorage(LocalStorageKeys.ADS_PERMISSION)
    if (checkAdsPermission) {
      setStateGeolocation(JSON.parse(checkAdsPermission))
      return
    }

    const result = await getReq<Fun7Ad | null>(`${endpoints.ads}${countryCode}`)
    if (result.data) {
      setStateAds(result.data)
      setLocalStorage(
        LocalStorageKeys.ADS_PERMISSION,
        JSON.stringify(result.data),
      )
    } else {
      setStateAds(null)
    }
  }

  // MUTATIONS
  const setStateGeolocation = (value: UserGeolocation | null) => {
    geolocation.value = value
  }

  const setStateAds = (value: Fun7Ad | null) => {
    ads.value = value
  }

  // GETTERS
  const stateGeolocation = computed<UserGeolocation | null>(
    () => geolocation.value,
  )

  const stateAds = computed<Fun7Ad | null>(() => ads.value)

  return {
    getGeolocation,
    stateGeolocation,
    getAdsData,
    stateAds,
  }
})
