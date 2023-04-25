export interface LoggedUserResponse {
  token: string
  refreshToken: string
  first_name: string
  last_name: string
  email: string
  username: string
  roles: string[]
}

export interface LoggingWrapper {
  success: boolean,
  errorMessage?: string,
  loggedUser?: LoggedUserResponse
}

export interface LoginRequestModel {
  username: string
  password: string
}

export interface SignUpRequest {
  email: string,
  username: string,
  password: string,
  name: string,
  surname: string,
  role: string
}
