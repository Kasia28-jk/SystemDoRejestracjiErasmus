import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  styleUrls: ['./auth-wrapper.component.css']
})
export class AuthWrapperComponent {

  constructor(private router: Router) {}

  login()
  {
    this.router.navigateByUrl('homepage/login');
  }

  registration()
  {
    this.router.navigateByUrl('homepage/registration');
  }
}
