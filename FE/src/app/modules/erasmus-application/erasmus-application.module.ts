import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentMainPageComponent} from "./pages/student-main-page/student-main-page.component";
import {UniversitiesPageComponent} from './pages/universities-page/universities-page.component';
import {AddUniversityComponent} from './pages/universities-page/components/add-university/add-university.component';
import {
  UniversitiesListComponent
} from './pages/universities-page/components/universities-list/universities-list.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {MatTableModule} from "@angular/material/table";
import {RoleCheckerDirective} from "./directive/role-checker.directive";
import {
  RegistrationForErasmusTripPageComponent
} from './pages/registration-for-erasmus-trip-page/registration-for-erasmus-trip-page.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {
  YourApplicationStatusComponent
} from './pages/student-main-page/components/your-application-status/your-application-status.component';
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {ApplicationsListPageComponent} from './pages/applications-list-page/applications-list-page.component';
import {ListUsersComponent} from "./pages/list-users/list-users.component";

@NgModule({
  declarations: [
    StudentMainPageComponent,
    UniversitiesPageComponent,
    AddUniversityComponent,
    UniversitiesListComponent,
    RegistrationForErasmusTripPageComponent,
    RoleCheckerDirective,
    YourApplicationStatusComponent,
    ApplicationsListPageComponent,
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    MatIconModule,
    RouterLink
  ],
  exports: [
    RoleCheckerDirective
  ]
})
export class ErasmusApplicationModule {
}
