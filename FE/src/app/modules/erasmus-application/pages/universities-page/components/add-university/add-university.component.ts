import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UniversityService} from "../../../../service/university.service";
import {UniversityModel} from "../../../../model/university.model";
import {take} from "rxjs";

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.scss']
})
export class AddUniversityComponent {
  public universityForm: FormGroup = this.createForm();

  @Output()
  public universityAdded = new EventEmitter<UniversityModel>();

  availableLanguages: string[] = ['Polski', 'Angielski', 'Niemiecki'];

  constructor(private fb: FormBuilder,
              private universityService: UniversityService) {
  }

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

  addUniversity() {
    if (this.universityForm.valid) {
      this.universityService.addUniversity(this.universityForm.value)
        .pipe(take(1))
        .subscribe(result => this.universityAdded.emit(result));
    } else {
      this.universityForm.markAsDirty();
      this.universityForm.updateValueAndValidity();
    }
  }
}
