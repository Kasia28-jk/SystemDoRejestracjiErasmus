import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { UserContextModel, UserContextWrapper } from '../model/user.model';
import { LoggedUserResponse } from '../model/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {

  private currentUser$: BehaviorSubject<UserContextWrapper> = new BehaviorSubject<UserContextWrapper>({ loggedIn: false });

  constructor(private router: Router) {}

  public isLoggedIn(): Observable<boolean> {
    return this.currentUser$.pipe(
      map((res) => res.loggedIn)
    );
  }

  public getUserContext(): Observable<UserContextModel> {
    return this.currentUser$.pipe(
      filter((wrapper) => wrapper.loggedIn),
      map((wrapper) => wrapper.userContext!)
    );
  }

  public getUserToken(): Observable<string> {
    return this.currentUser$.pipe(
      map((wrapper) => wrapper.loggedIn ? wrapper.userContext!.token : '')
    );
  }

  public getUserId(): Observable<string> {
    return this.currentUser$.pipe(
      filter((wrapper) => wrapper.loggedIn),
      map((wrapper) => String(wrapper.userContext!.id))
    );
  }

  public setLoggedUser(userLogged: LoggedUserResponse): void {
    this.currentUser$.next({
      loggedIn: true,
      userContext: {
        id: userLogged.id,
        name: userLogged.firstName,
        surname: userLogged.lastName,
        roles: userLogged.roles,
        token: userLogged.token
      }
    });
  }

  public logOutUser() {
    this.currentUser$.next({ loggedIn: false });
    this.router.navigate(['/auth/login'])
    console.log(this.currentUser$.getValue().userContext?.token)
  }
}
