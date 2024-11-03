import type { Result } from '@/types/app.type'

export function useHttp() {
  async function getReq<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.json()
  }

  async function postReq<T>(
    url: string,
    body: { [key: string]: string | number },
  ): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    return response.json()
  }

  async function patchReq<T>(
    url: string,
    body: { [key: string]: string | number },
  ): Promise<T> {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    return response.json()
  }

  async function deleteReq<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.json()
  }

  return { getReq, postReq, patchReq, deleteReq }
}
