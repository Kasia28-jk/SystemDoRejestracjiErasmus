import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {ErasmusApplicationModule} from "./modules/erasmus-application/erasmus-application.module";
import { StudentMainPageComponent } from './modules/pages/student-main-page/student-main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentMainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ErasmusApplicationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
