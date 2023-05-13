import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserContextService } from 'src/app/core/services/user-context.service';

interface ApplicationModel {
  email: string;
  phoneNumber: string;
  universityName: string;
  selectedFile?: File;
}

@Component({
  selector: 'app-registration-for-erasmus-trip-page',
  templateUrl: './registration-for-erasmus-trip-page.component.html',
  styleUrls: ['./registration-for-erasmus-trip-page.component.scss']
})
export class RegistrationForErasmusTripPageComponent {
  registrationForm!: FormGroup;
  selectedFile: File | undefined;

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private userContextService: UserContextService,) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      universityName: ['', [Validators.required]]
    });
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedFile = target.files?.[0];
  }

  onSubmit() {
    const applicationModel: ApplicationModel = {
      email: this.registrationForm.value.email,
      phoneNumber: this.registrationForm.value.phoneNumber,
      universityName: this.registrationForm.value.universityName,
      selectedFile: this.selectedFile
    };
    this.addUniversity(applicationModel).subscribe(
      (response) => {
        console.log('University added successfully:', response);
      },
      (error) => {
        console.error('Error while adding university:', error);
      }
    );
  }
  
  getFileIcon(): string {
    const fileExtension = this.selectedFile?.name.split('.').pop();
    switch (fileExtension) {
      case 'pdf':
        return 'assets/icons/pdf.svg';
      case 'doc':
      case 'docx':
        return 'assets/icons/doc.svg';
      default:
        return 'assets/icons/image.svg';
    }
  }

  public addUniversity(applicationModel: ApplicationModel): Observable<ApplicationModel> {
    return this.userContextService.getUserToken().pipe(
      switchMap((accessToken) => {
        const httpHeaders = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        });
        return this.httpClient.post<ApplicationModel>('/api/v1/application', applicationModel, { headers: httpHeaders });
      })
    );
  }

}
