export type ResultError = {
  message: string
  error: string
  statusCode: number
}

export type Result<T> = {
  data?: T
  message: string
  error?: string
  statusCode: number
}
