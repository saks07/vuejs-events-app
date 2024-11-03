export type ResultError = {
  error?: string
  message: string
  statusCode: number
}

export type Result<T> = {
  data?: T
} & ResultError
