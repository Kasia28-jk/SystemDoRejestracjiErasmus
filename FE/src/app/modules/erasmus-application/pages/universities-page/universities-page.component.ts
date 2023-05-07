import {Component} from '@angular/core';
import {Role} from "../../model/roles.enum";

@Component({
  selector: 'app-universities-page',
  templateUrl: './universities-page.component.html',
  styleUrls: ['./universities-page.component.css']
})
export class UniversitiesPageComponent {

  public allRoles = Role;
}
