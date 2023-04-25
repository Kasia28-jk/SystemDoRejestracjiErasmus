import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthWrapperComponent} from './core/pages/auth-wrapper/auth-wrapper.component';
import {LoginComponent} from './core/pages/auth-wrapper/page-components/login/login.component';
import {PagenotfoundComponent} from './core/pages/pagenotfound/pagenotfound.component';
import {RegistrationComponent} from './core/pages/auth-wrapper/page-components/registration/registration.component';
import {DashboardComponent} from './core/pages/dashboard/dashboard.component';
import {AuthGuard} from "./core/guard/auth.guard";
import {
  StudentMainPageComponent
} from "./modules/erasmus-application/pages/student-main-page/student-main-page.component";
import {
  UniversitiesPageComponent
} from "./modules/erasmus-application/pages/universities-page/universities-page.component";

const routes: Routes = [
  {path: '', redirectTo: 'erasmus', pathMatch: 'full'},
  {
    path: 'auth', component: AuthWrapperComponent, children: [
      {path: "", redirectTo: "login", pathMatch: "full"},
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent},
    ]
  },
  {
    path: 'erasmus',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {path: "", redirectTo: "main", pathMatch: "full"},
      {path: 'main', component: StudentMainPageComponent},
      {path: 'universities', component: UniversitiesPageComponent},
    ]
  },
  {path: '**', pathMatch: 'full', component: PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
