import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {UniversityService} from "../../../../service/university.service";
import {UniversityModel} from "../../../../model/university.model";
import {take} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

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
              private _snackBar: MatSnackBar,
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

  addUniversity(formDirective: FormGroupDirective) {
    if (this.universityForm.valid) {
      this.universityService.addUniversity(this.universityForm.value)
        .pipe(take(1))
        .subscribe(result => {
          this.universityAdded.emit(this.universityForm.value);
          this._snackBar.open("Poprawnie dodano nową uczelnie");

          this.universityForm.reset({}, {onlySelf: false, emitEvent: false});
          this.universityForm.markAsUntouched({onlySelf: false});
          this.universityForm.markAsPristine({onlySelf: false});

          formDirective.resetForm();
        });
    } else {
      this.universityForm.markAsDirty();
      this.universityForm.updateValueAndValidity();
    }
  }
}
