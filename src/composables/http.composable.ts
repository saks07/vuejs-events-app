import type { Result, ResultError } from '@/types/app.type'

export function useHttp() {
  async function getReq<T>(url: string): Promise<Result<T>> {
    try {
      const response = await fetch(url, {
        mode: 'cors',
        method: 'GET',
      })
      const data = await response.json()
      return data
    } catch (err: unknown) {
      const castError = err as ResultError
      return {
        message: castError.message,
        error: castError.error,
        statusCode: castError.statusCode,
      }
    }
  }

  async function postReq<T>(
    url: string,
    body: { [key: string]: string },
  ): Promise<Result<T>> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const data = await response.json()
      return data
    } catch (err: unknown) {
      const castError = err as ResultError
      return {
        message: castError.message,
        error: castError.error,
        statusCode: castError.statusCode,
      }
    }
  }

  async function patchReq<T>(
    url: string,
    body: { [key: string]: string | number },
  ): Promise<Result<T>> {
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const data = await response.json()
      return data
    } catch (err: unknown) {
      const castError = err as ResultError
      return {
        message: castError.message,
        error: castError.error,
        statusCode: castError.statusCode,
      }
    }
  }

  async function deleteReq<T>(
    url: string,
    headers?: { [key: string]: string | number },
  ): Promise<Result<T>> {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        ...headers,
      })
      const data = await response.json()
      return data
    } catch (err: unknown) {
      const castError = err as ResultError
      return {
        message: castError.message,
        error: castError.error,
        statusCode: castError.statusCode,
      }
    }
  }

  return { getReq, postReq, patchReq, deleteReq }
}
