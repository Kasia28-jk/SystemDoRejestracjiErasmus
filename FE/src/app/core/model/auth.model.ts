import {Role} from "../../modules/erasmus-application/model/roles.enum";

export interface LoggedUserResponse {
  id: string,
  token: string
  refreshToken: string
  firstName: string
  lastName: string
  email: string
  username: string
  roles: Role[]
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
  first_name: string,
  last_name: string,
  roles: string[]
}
