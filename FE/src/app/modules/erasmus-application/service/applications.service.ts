import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, switchMap} from "rxjs";
import {UniversityModel} from "../model/university.model";
import {ApplicationModel} from "../model/application.model";
import {UserContextService} from "../../../core/services/user-context.service";
import {ApplicationResponse} from "../model/application-response.module";
import {ApplicationStatus} from "../model/application-status.enum";
import { ApplicationStatusRequest } from '../pages/applications-list-page/applications-list-page.component';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(private userContextService: UserContextService,
              private httpClient: HttpClient) {
  }

  public getAll(): Observable<ApplicationModel[]> {
    return this.userContextService.getUserToken().pipe(
      switchMap((accessToken) => {
        const httpHeaders = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        });
        return this.httpClient.get<ApplicationResponse[]>("/api/v1/application/all", {headers: httpHeaders})
          .pipe(
            map(response => this.mapFromResponse(response))
          )
      })
    );
  }

  public mapFromResponse(applicationResponses: ApplicationResponse[]): ApplicationModel[] {
    return applicationResponses.map(
      applicationRes => {
        return {
          applicationId: applicationRes.id,
          universities: applicationRes.universities?.map(university => university.name) || [],
          name: applicationRes.applicantName || "Jan",
          surname: applicationRes.applicantSurname || "Kazimierz",
          creationDate: applicationRes.creationDate ? new Date(applicationRes.creationDate) : new Date(),
          applicationStatus: applicationRes.status as ApplicationStatus,
          applicationStatusLabel: this.translateStatus(applicationRes.status as ApplicationStatus),
          additionalInformation: ""
        }
      }
    )
  }

  public appUpdate(applicationRequest: ApplicationStatusRequest): Observable<ApplicationStatusRequest> {
    return this.userContextService.getUserToken().pipe(
      switchMap((accessToken) => {
        const httpHeaders = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        });
        return this.httpClient.post<ApplicationStatusRequest>('/api/v1/application/update', applicationRequest, { headers: httpHeaders });
      })
    );
  }

  private translateStatus(status: ApplicationStatus): string {
    switch (status) {
      case ApplicationStatus.REJECTED:
        return 'Odrzucona';
      case ApplicationStatus.SUBMITTED:
        return 'Złożona';
      case ApplicationStatus.DISCUSSED:
        return 'Rozpatrywana';
      case ApplicationStatus.APPROVED:
        return 'Zaakceptowana';
      default:
        return status;
    }
  }
}
