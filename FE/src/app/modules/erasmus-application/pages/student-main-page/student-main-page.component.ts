import {Component, OnInit} from '@angular/core';
import {EMPTY, Observable} from "rxjs";
import {UserContextModel} from "../../../../core/model/user.model";
import {UserContextService} from "../../../../core/services/user-context.service";

@Component({
  selector: 'app-student-main-page',
  templateUrl: './student-main-page.component.html',
  styleUrls: ['./student-main-page.component.scss']
})
export class StudentMainPageComponent implements OnInit {
  public userContext$: Observable<UserContextModel> = EMPTY;

  constructor(private readonly userContextService: UserContextService) {
  }

  ngOnInit(): void {
    this.userContext$ = this.userContextService.getUserContext();
  }
}
