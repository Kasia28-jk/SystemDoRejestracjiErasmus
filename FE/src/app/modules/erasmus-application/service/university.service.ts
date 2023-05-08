import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UniversityModel} from "../model/university.model";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor(private readonly httpClient: HttpClient) {
  }

  public addUniversity(universityModel: UniversityModel): Observable<UniversityModel> {
    return this.httpClient.post<UniversityModel>('/api/v1/universities', universityModel);
  }

  public getAll(): Observable<UniversityModel[]> {
    return this.httpClient.get<UniversityModel[]>('/api/v1/universities/all');
  }
}
