import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {RegistrationService} from '../../../../services/registration.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {map, take, tap} from "rxjs";
import {SignUpRequest} from "../../../../model/auth.model";
import {SIGN_UP_ERROR} from "../../../../commons/message.commons";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  public errorMessage: string | undefined;

  constructor(
    private router: Router,
    private registrationService: RegistrationService
  ) {
  }

  registrationForm!: FormGroup;

  ngOnInit() {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
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
    // TODO - sending new login request and automatically logging user.
  }

  private handleUnsuccessfulResponse() {
    this.errorMessage = SIGN_UP_ERROR;
  }
}
