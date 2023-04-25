import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.scss']
})
export class AddUniversityComponent {
  public universityForm: FormGroup = this.createForm();

  availableLanguages: string[] = ['Polski', 'Angielski', 'Niemiecki'];

  constructor(private fb: FormBuilder) { }

  createForm() {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      availableLanguages: [[], Validators.required]
    });
  }
}
