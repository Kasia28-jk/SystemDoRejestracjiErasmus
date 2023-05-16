import {Component, OnInit} from '@angular/core';
import {ApplicationStatus} from "../../../../model/application-status.enum";
import {ApplicationModel} from "../../../../model/application.model";
import { YourApplicationStatusService } from 'src/app/modules/erasmus-application/service/your-application-status.service';
import { ApplicationResponse } from 'src/app/modules/erasmus-application/model/application-response.module';

@Component({
  selector: 'app-your-application-status',
  templateUrl: './your-application-status.component.html',
  styleUrls: ['./your-application-status.component.scss']
})
export class YourApplicationStatusComponent  implements OnInit 
{
  applicationStatus: ApplicationStatus = ApplicationStatus.REJECTED;
  application: ApplicationModel | undefined = "!!!" as any;

  //allUniversities: ApplicationResponse;
  constructor(private yourApplicationStatusService: YourApplicationStatusService) {
    //console.log(LoggedUserResponse.id)
  }

  ngOnInit(): void {
    this.loadStatus();
  }

  public loadStatus()
  {
    console.log("cos");
    const cos = this.yourApplicationStatusService.getStatus();
    console.log(cos);
  }
}
