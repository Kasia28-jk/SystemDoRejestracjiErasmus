import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserContextService } from 'src/app/core/services/user-context.service';
import { UniversityService } from '../../service/university.service';

export interface Application {
  ownerId: string;
  email: string;
  phoneNumber: string;
  universities_ids: string[];
  file: string | Blob;
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
  selectedFile: File | undefined;

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
    this.selectedFile = target.files?.[0];
  }

  public onSubmit() {
    this.userContextService.getUserContext().subscribe((data) => {
      const applicationRequest = {
        ownerId: data.id,
        email: this.registrationForm.value.email,
        phoneNumber: this.registrationForm.value.phoneNumber,
        universities_ids: this.universities.value,
      };

      const formData = new FormData();
      if (this.selectedFile) {
        formData.append('pdfFiles', this.selectedFile);
      }

      formData.append('applicationRequest', JSON.stringify(applicationRequest));

      this.addUniversity(formData).subscribe(
        (response) => {
          console.log('University added successfully:', response);
        },
        (error) => {
          console.error('Error while adding university:', error);
        }
      );
    });
  }

  public getFileIcon(): string {
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

  public loadAllUniversities() {
    this.universityService
      .getAll()
      .pipe(take(1))
      .subscribe((response) => {
        this.universitiesList = response.map((obj) => obj.name);
      });
  }

  public addUniversity(formData: FormData): Observable<any> {
    return this.userContextService.getUserToken().pipe(
      switchMap((accessToken) => {
        const httpHeaders = new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
        });
        return this.httpClient.post('/api/v1/application', formData, { headers: httpHeaders });
      })
    );
  }
}
