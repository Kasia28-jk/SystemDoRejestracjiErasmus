import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import {LoggedUserResponse, LoggingWrapper, LoginRequestModel} from "../model/auth.model";
import {DEFAULT_ERROR, ERROR_TO_MESSAGE_MAP} from "../commons/message.commons";

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private readonly httpClient: HttpClient) {
  }

  login(loginRequestModel: LoginRequestModel): Observable<LoggingWrapper> {
    return this.httpClient.post<LoggedUserResponse>("/api/auth/authenticate", loginRequestModel)
      .pipe(
        map(response => {
          return {success: true, loggedUser: response}
        }),
        catchError(err => {
          const errorMessage = ERROR_TO_MESSAGE_MAP.has(err.status) ? ERROR_TO_MESSAGE_MAP.get(err.status) : DEFAULT_ERROR;
          return of({success: false, errorMessage: errorMessage})
        })
      );
  }
}
