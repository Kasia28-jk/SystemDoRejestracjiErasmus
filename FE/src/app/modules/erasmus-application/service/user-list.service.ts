import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { UserContextService } from 'src/app/core/services/user-context.service';
import { UserResponse } from '../model/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(private userContextService: UserContextService, private httpClient: HttpClient) { }

  public getUsers(): Observable<UserResponse[]> {
    return this.userContextService.getUserToken().pipe(
      switchMap((accessToken) => {
        const httpHeaders = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        });

        return this.httpClient.get<UserResponse[]>(`/api/v1/user/all`, { headers: httpHeaders });
      })
    );
  }
}
