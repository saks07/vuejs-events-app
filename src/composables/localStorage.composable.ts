import { LocalStorageKeys } from '@/enum/app.enum'

export function useLocalStorage() {
  const setLocalStorage = (key: LocalStorageKeys, value: string): void => {
    window.localStorage.setItem(key, value)
  }

  const getLocalStorage = (key: LocalStorageKeys): string | null => {
    return window.localStorage.getItem(key)
  }

  return {
    setLocalStorage,
    getLocalStorage,
  }
}
