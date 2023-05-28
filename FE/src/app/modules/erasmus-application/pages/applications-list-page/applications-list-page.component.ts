import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {take} from "rxjs";
import {ApplicationsService} from "../../service/applications.service";
import {ApplicationModel} from "../../model/application.model";
import {Role} from "../../model/roles.enum";

@Component({
  selector: 'app-applications-list-page',
  templateUrl: './applications-list-page.component.html',
  styleUrls: ['./applications-list-page.component.scss']
})
export class ApplicationsListPageComponent implements OnInit {

  public allRoles = Role;
  dataSource = new MatTableDataSource<ApplicationModel>([]);
  allApplications: ApplicationModel[] = [];

  displayedColumns: string[] = ['name', 'surname', 'universities', 'creationDate', 'status', 'action'];

  constructor(private readonly applicationsService: ApplicationsService) {
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
}
