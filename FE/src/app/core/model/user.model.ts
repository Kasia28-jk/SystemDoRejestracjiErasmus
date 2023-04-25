
export interface UserContextModel {
  name: string,
  surname: string,
  roles: string[],
  token: string
}

export interface UserContextWrapper {
  loggedIn: boolean,
  userContext?: UserContextModel
}
