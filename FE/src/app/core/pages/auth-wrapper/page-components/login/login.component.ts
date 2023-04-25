import {Component} from '@angular/core';
import {LoginService} from '../../../../services/login.service';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {take} from "rxjs";
import {UserContextService} from "../../../../services/user-context.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public errorMessage: string | undefined;

  constructor(private loginService: LoginService,
              private readonly router: Router,
              private readonly userContextService: UserContextService
  ) {
  }

  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    }, {updateOn: 'blur'});
  }

  onSubmit() {
    this.errorMessage = undefined;
    this.loginService.login(this.loginForm.value)
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
}
