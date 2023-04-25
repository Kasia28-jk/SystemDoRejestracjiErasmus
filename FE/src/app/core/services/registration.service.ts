import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SignUpRequest} from "../model/auth.model";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) {
  }

  signUp(userData: SignUpRequest): Observable<boolean> {
    return this.httpClient.post<void>("/api/auth/register", userData)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      )
  }
}
