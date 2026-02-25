export interface UseRegisterRequest {
  email: string
  password: string
}

export interface UseRegisterResponse {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}
