import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RegistrationService} from '../../../../services/registration.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {take, tap} from "rxjs";
import {SignUpRequest} from "../../../../model/auth.model";
import {SIGN_UP_ERROR} from "../../../../commons/message.commons";
import {LoginService} from "../../../../services/login.service";
import {UserContextService} from "../../../../services/user-context.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public errorMessage: string | undefined;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private userContextService: UserContextService,
    private registrationService: RegistrationService
  ) {
  }

  registrationForm!: FormGroup;

  ngOnInit() {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      roles: new FormControl([], Validators.required)
    }, {updateOn: 'blur'});
  }

  onSubmit() {
    this.registrationService.signUp(this.registrationForm.value)
      .pipe(
        tap(successful => {
          if (successful) {
            this.handleSuccessfulEvent(this.registrationForm.value);
          } else {
            this.handleUnsuccessfulResponse();
          }
        }),
        take(1)
      )
      .subscribe();
  }

  private handleSuccessfulEvent(value: SignUpRequest) {
    this.loginService.login({username: value.username, password: value.password})
      .pipe(take(1))
      .subscribe(res => {
        if (!res.success) {
          this.errorMessage = res.errorMessage;
        } else {
          this.userContextService.setLoggedUser(res.loggedUser!);
          this.router.navigate(['/', 'erasmus']).then();
        }
      });
  }

  private handleUnsuccessfulResponse() {
    this.errorMessage = SIGN_UP_ERROR;
  }
}
