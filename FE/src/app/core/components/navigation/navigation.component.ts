import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserContextService} from '../../services/user-context.service';
import {Role} from "../../../modules/erasmus-application/model/roles.enum";

export interface NavType {
  name: string;
  path: string;
  requiredRole: Role
}

export interface Navigation {
  [id: string]: NavType
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent {

  NAVIGATION: Navigation = {
    mainPage: {
      name: "Panel główny",
      path: "/erasmus/main",
      requiredRole: Role.ROLE_USER
    },
    registration: {
      name: "Rejestracja na wyjazd",
      path: "/erasmus/apply",
      requiredRole: Role.ROLE_USER
    },
    universities: {
      name: "Lista uczelni",
      path: "/erasmus/universities",
      requiredRole: Role.ROLE_USER
    },
    applications: {
      name: "Lista zgłoszeń",
      path: "/erasmus/applications",
      requiredRole: Role.ROLE_ADMIN
    },

  }
  public navigation = Object.keys(this.NAVIGATION);

  constructor(public router: Router, private userContextService: UserContextService) {

  }

  logout() {
    this.userContextService.logOutUser();
  }
}
