import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserContextService } from 'src/app/core/services/user-context.service';
import { UniversityService } from '../../service/university.service';

export interface ApplicationRequest {
  ownerId: string;
  email: string;
  phoneNumber: string;
  universities_ids: string[];
}

export interface DataToPass {
  applicationRequest: ApplicationRequest;
  pdfFiles: File[];
}

@Component({
  selector: 'app-registration-for-erasmus-trip-page',
  templateUrl: './registration-for-erasmus-trip-page.component.html',
  styleUrls: ['./registration-for-erasmus-trip-page.component.scss']
})
export class RegistrationForErasmusTripPageComponent {
  universities = new FormControl();
  universitiesList: string[] = [];

  registrationForm!: FormGroup;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private userContextService: UserContextService,
    private readonly universityService: UniversityService
  ) {}

  ngOnInit() {
    this.loadAllUniversities();
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      universities: ['', [Validators.required]],
    });
  }

  public onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedFiles = Array.from(target.files || []);
  }

  public onSubmit() {
    this.userContextService.getUserContext().subscribe((data) => {
      const applicationRequest: ApplicationRequest = {
        ownerId: data.id,
        email: this.registrationForm.value.email,
        phoneNumber: this.registrationForm.value.phoneNumber,
        universities_ids: this.universities.value,
      };

      const dataToPass: DataToPass = {
        applicationRequest: applicationRequest,
        pdfFiles: this.selectedFiles
      };

      this.addUniversity(dataToPass).subscribe(
        (response) => {
          console.log('University added successfully:', response);
        },
        (error) => {
          console.error('Error while adding university:', error);
        }
      );
    });
  }

  public getFileIcon(file: File): string {
    const fileExtension = file.name.split('.').pop();
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

  public loadAllUniversities() {
    this.universityService
      .getAll()
      .pipe(take(1))
      .subscribe((response) => {
        this.universitiesList = response.map((obj) => obj.name);
      });
  }

  public addUniversity(data: DataToPass): Observable<any> {
    return this.userContextService.getUserToken().pipe(
      switchMap((accessToken) => {
        const formData = new FormData();
        formData.append('applicationRequest', JSON.stringify(data.applicationRequest));

        data.pdfFiles.forEach((file, index) => {
          formData.append(`pdfFiles`, file, file.name);
        });

        const httpHeaders = new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        });
        return this.httpClient.post('/api/v1/application', formData, { headers: httpHeaders });
      })
    );
  }
}
