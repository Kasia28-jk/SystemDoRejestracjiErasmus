import {Component, ViewChild} from '@angular/core';
import {Role} from "../../model/roles.enum";
import {UniversityModel} from "../../model/university.model";
import {UniversitiesListComponent} from "./components/universities-list/universities-list.component";

@Component({
  selector: 'app-universities-page',
  templateUrl: './universities-page.component.html',
  styleUrls: ['./universities-page.component.css']
})
export class UniversitiesPageComponent {

  @ViewChild(UniversitiesListComponent)
  public universitiesListComponent: UniversitiesListComponent | undefined;

  public allRoles = Role;

  onUniversityAdded(universityModel: UniversityModel) {
    this.universitiesListComponent!.addUniversity(universityModel);

  }
}
