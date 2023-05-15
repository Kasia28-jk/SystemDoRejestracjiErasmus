import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserContextService } from '../../services/user-context.service';

export interface NavType {
  name: string;
  path: string;
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
      path: "/erasmus/main"
    },
    registration: {
      name: "Rejestracja na wyjazd",
      path: "/erasmus/apply"
    },
    universities: {
      name: "Lista uczelni",
      path: "/erasmus/universities"
    },

  }
  public navigation = Object.keys(this.NAVIGATION);

  constructor(public router: Router, private userContextService: UserContextService) {

  }

  logout() {
    // this.userContextService.logOutUser();
    console.log(this.router.url);
    console.log(this.userContextService.getUserContext());

  }
}
