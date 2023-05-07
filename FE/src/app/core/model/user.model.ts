import {Role} from "../../modules/erasmus-application/model/roles.enum";

export interface UserContextModel {
  name: string,
  surname: string,
  roles: Role[],
  token: string
}

export interface UserContextWrapper {
  loggedIn: boolean,
  userContext?: UserContextModel
}
