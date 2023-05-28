import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Observable, tap} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {UserContextService} from 'src/app/core/services/user-context.service';
import {UniversityService} from '../../service/university.service';
import {UniversityModel} from '../../model/university.model';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  universitiesList: UniversityModel[] = [];

  registrationForm!: FormGroup;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private userContextService: UserContextService,
    private readonly universityService: UniversityService
  ) {
  }

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


  public loadAllUniversities() {
    this.universityService
      .getAll()
      .pipe(take(1))
      .subscribe((response) => {
        this.universitiesList = response.map((obj) => obj);
      });
  }

  public onSubmit() {
    this.userContextService.getUserContext().subscribe((data) => {
      const selectedUniversities: string[] = this.universities.value.map((university: { id: string; }) => university.id);

      const applicationRequest: ApplicationRequest = {
        ownerId: data.id,
        email: this.registrationForm.value.email,
        phoneNumber: this.registrationForm.value.phoneNumber,
        universities_ids: selectedUniversities,
      };

      console.log(selectedUniversities);

      const dataToPass: DataToPass = {
        applicationRequest: applicationRequest,
        pdfFiles: this.selectedFiles,
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

  public addUniversity(data: DataToPass): Observable<any> {
    return this.userContextService.getUserToken().pipe(
      switchMap((accessToken: string) => {

        console.log(data.applicationRequest);
        const formData: FormData = new FormData();

        const jsonBlob: Blob = new Blob([JSON.stringify(data.applicationRequest)], {type: 'application/json'})

        formData.append('applicationRequest', jsonBlob);

        for (let i: number = 0; i < data.pdfFiles.length; i++) {
          formData.append('pdfFiles', data.pdfFiles[i]);
        }

        const httpHeaders = new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
        });

        return this.httpClient.post('/api/v1/application', formData, {headers: httpHeaders})
          .pipe(
            tap(() => {
                this.snackBar.open("Poprawnie złożono zgłoszenie!", "Sukces", {duration: 2000});
                this.router.navigate(['erasmus']).then();
              }
            )
          )
      })
    );
  }
}
