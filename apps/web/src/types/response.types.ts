export interface ApiResponse<T> {
  isSuccessful: boolean
  isDebug: boolean
  responseCode: string
  responseMsg: string
  result: T
}
