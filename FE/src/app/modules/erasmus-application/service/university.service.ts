import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, switchMap } from "rxjs";
import { UniversityModel } from "../model/university.model";
import * as http from "http";
import { UserContextService } from 'src/app/core/services/user-context.service';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor(private userContextService: UserContextService, private httpClient: HttpClient) {
  }
  
  // COŚ JEST NIE TEN TEGO. ZWRACA 403 - FORBIDDEN. NIE WIEM JAKI MA BYĆ FORMAT WYSYŁANYCH DANYCH..
  public addUniversity(universityModel: UniversityModel): Observable<UniversityModel> {
    return this.userContextService.getUserToken().pipe(
      switchMap((accessToken) => {
        const httpHeaders = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        });
        return this.httpClient.post<UniversityModel>('/api/v1/universities', universityModel, { headers: httpHeaders });
      })
    );
  }

  public getAll(): Observable<UniversityModel[]> {
    return this.userContextService.getUserToken().pipe(
      switchMap((accessToken) => {
        const httpHeaders = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        });
        return this.httpClient.get<UniversityModel[]>("/api/v1/universities/all", { headers: httpHeaders });
      })
    );
  }

}
