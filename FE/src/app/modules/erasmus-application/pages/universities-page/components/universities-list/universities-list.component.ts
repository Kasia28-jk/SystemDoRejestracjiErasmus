import {Component, OnInit} from '@angular/core';
import {UniversityModel} from "../../../../model/university.model";
import {take} from "rxjs";
import {UniversityService} from "../../../../service/university.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-universities-list',
  templateUrl: './universities-list.component.html',
  styleUrls: ['./universities-list.component.scss']
})
export class UniversitiesListComponent implements OnInit {

  dataSource = new MatTableDataSource<UniversityModel>([]);
  allUniversities: UniversityModel[] = [];

  displayedColumns: string[] = ['name', 'description', 'address', 'city', 'country', 'email', 'phoneNumber', 'availableLanguages'];

  constructor(private readonly universityService: UniversityService) {
  }

  ngOnInit(): void {
    this.loadAllUniversities();
  }

  public addUniversity(universityModel: UniversityModel) {
    this.loadAllUniversities();
  }

  public loadAllUniversities() {
    this.universityService.getAll()
      .pipe(take(1))
      .subscribe(response => {
        this.allUniversities = response;
        this.dataSource.data = this.allUniversities;
      });
  }
}
