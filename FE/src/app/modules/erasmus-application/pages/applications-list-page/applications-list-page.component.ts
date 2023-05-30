import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Observable, switchMap, take} from "rxjs";
import {ApplicationsService} from "../../service/applications.service";
import {ApplicationModel} from "../../model/application.model";
import {Role} from "../../model/roles.enum";
import { ApplicationStatus } from '../../model/application-status.enum';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserContextService } from 'src/app/core/services/user-context.service';

export interface ApplicationStatusRequest {
  applicationId: string,
  status: string
}

@Component({
  selector: 'app-applications-list-page',
  templateUrl: './applications-list-page.component.html',
  styleUrls: ['./applications-list-page.component.scss']
})
export class ApplicationsListPageComponent implements OnInit {
  applicationStatusOptions = Object.values(ApplicationStatus);
  public allRoles = Role;
  dataSource = new MatTableDataSource<ApplicationModel>([]);
  allApplications: ApplicationModel[] = [];

  displayedColumns: string[] = ['name', 'surname', 'universities', 'creationDate', 'status', 'action'];

  constructor(private readonly applicationsService: ApplicationsService, private httpClient: HttpClient, private userContextService: UserContextService) {
  }

  ngOnInit(): void {
    this.loadAllApplications();
  }

  public loadAllApplications() {
    this.applicationsService.getAll()
      .pipe(take(1))
      .subscribe(response => {
        this.allApplications = response;
        this.dataSource.data = this.allApplications;
      });
  }

  getApplicationStatusLabel(status: ApplicationStatus): string {
    switch (status) {
      case ApplicationStatus.REJECTED:
        return 'Odrzuć';
      case ApplicationStatus.SUBMITTED:
        return 'Odłóż na później';
      case ApplicationStatus.DISCUSSED:
        return 'W trakcie analizy';
      case ApplicationStatus.APPROVED:
        return 'Zaakceptuj';
      default:
        return '';
    }
  }

  getStatusIconClass(status: ApplicationStatus): string {
    switch (status) {
      case ApplicationStatus.REJECTED:
        return 'icon-rejected';
      case ApplicationStatus.SUBMITTED:
        return 'icon-submitted';
      case ApplicationStatus.DISCUSSED:
        return 'icon-discussed';
      case ApplicationStatus.APPROVED:
        return 'icon-approved';
      default:
        return '';
    }
  }  
  
  onStatusChange(application: ApplicationModel, selectedStatus: ApplicationStatus) {
    let appStatusReq: ApplicationStatusRequest = {
      applicationId: application.applicationId,
      status: selectedStatus
    };
  
    console.log(appStatusReq);
    this.applicationsService.appUpdate(appStatusReq).subscribe(
      response => {
        console.log('Application status updated successfully', response);
        // Update the status in the allApplications array
        application.applicationStatus = selectedStatus;
        // Update the dataSource to reflect the changes
        this.dataSource.data = this.allApplications;
      },
      error => {
        console.log('An error occurred while updating application status', error);
        // Handle error and display appropriate message
      }
    );
  }

  getApplicationStatusLabelResponse(status: ApplicationStatus): string {
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
