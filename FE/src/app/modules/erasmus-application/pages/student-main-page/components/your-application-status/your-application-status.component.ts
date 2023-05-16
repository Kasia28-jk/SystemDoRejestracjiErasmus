import {Component} from '@angular/core';
import {ApplicationStatus} from "../../../../model/application-status.enum";
import {ApplicationModel} from "../../../../model/application.model";
import { UniversityService } from 'src/app/modules/erasmus-application/service/university.service';

@Component({
  selector: 'app-your-application-status',
  templateUrl: './your-application-status.component.html',
  styleUrls: ['./your-application-status.component.scss']
})
export class YourApplicationStatusComponent {
  applicationStatus: ApplicationStatus = ApplicationStatus.REJECTED;
  application: ApplicationModel | undefined = "!!!" as any;
}
