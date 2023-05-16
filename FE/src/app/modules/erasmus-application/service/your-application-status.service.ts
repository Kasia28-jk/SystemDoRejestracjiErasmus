import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserContextService } from 'src/app/core/services/user-context.service';
import { Observable, switchMap } from "rxjs";
import { ApplicationResponse } from '../model/application-response.module';
import { LoggedUserResponse } from 'src/app/core/model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class YourApplicationStatusService {
  
  loggedUserResponse: LoggedUserResponse | undefined; 

  constructor (private userContextService: UserContextService, private httpClient: HttpClient) {
    //console.log(this.loggedUserResponse.id)
  }


  public getStatus(): Observable<ApplicationResponse> {
    return this.userContextService.getUserToken().pipe(
      switchMap((accessToken) => {
        const httpHeaders = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        });
        const owner_id = this.userContextService.getUserContext()
        return this.httpClient.get<ApplicationResponse>(`/api/v1/application/${owner_id}`, { headers: httpHeaders });
      })
    );
  }
  
}
