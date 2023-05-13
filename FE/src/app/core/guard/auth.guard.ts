import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {UserContextService} from "../services/user-context.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private userContextService: UserContextService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userContextService.isLoggedIn()
      .pipe(
        tap(loggedIn => {
          if (!loggedIn) {
            // PRZY ODŚWIEŻENIU STRONY loggedIn staje się zawsze false co jest zupełnie bez sensu. Do poprawy
            this.router.navigate(['', 'auth', 'login']).then();
          }
        })
      )
  }
}
