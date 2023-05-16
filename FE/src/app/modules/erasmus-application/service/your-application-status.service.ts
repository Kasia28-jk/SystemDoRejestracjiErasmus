import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserContextService } from 'src/app/core/services/user-context.service';
import { Observable, of, switchMap } from "rxjs";
import { ApplicationResponse } from '../model/application-response.module';
import { LoggedUserResponse } from 'src/app/core/model/auth.model';
import { UniversityModel } from '../model/university.model';

@Injectable({
  providedIn: 'root'
})
export class YourApplicationStatusService {
  
  loggedUserResponse: LoggedUserResponse | undefined; 
  owner_id: string | undefined; 
  univeristies: UniversityModel[] | undefined;
  constructor (private userContextService: UserContextService, private httpClient: HttpClient) {}


  public getStatus(): Observable<ApplicationResponse> {
    return this.userContextService.getUserToken().pipe(
      switchMap((accessToken) => {
        const httpHeaders = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        });

        this.userContextService.getUserId().subscribe((data) => {
          this.owner_id = data;
        });
        
        return of({id: "1", phoneNumber: "9999999", email:"kasia@wp.pl", status:"Oczekiwanie", universities:[{name:"University Of Seoul", city:"Seoul"},{name:"Universidad Malaga", city:"Malaga"},{name:"Amsterdam University of Technology", city:"Amsterdam"}]});
        //return this.httpClient.get<ApplicationResponse>(`/api/v1/application/${this.owner_id}`, { headers: httpHeaders });
      })
    );
  }
  
}
