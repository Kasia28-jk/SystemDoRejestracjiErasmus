import {Component, OnInit} from '@angular/core';
import {UniversityModel} from "../../../../model/university.model";
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs";
import {UniversityService} from "../../../../service/university.service";

@Component({
  selector: 'app-universities-list',
  templateUrl: './universities-list.component.html',
  styleUrls: ['./universities-list.component.scss']
})
export class UniversitiesListComponent implements OnInit {

  allUniversities: UniversityModel[] = [
    {
      name: 'Uniwersytet Warszawski',
      description: 'Uniwersytet publiczny',
      address: 'Krakowskie Przedmieście 26/28',
      city: 'Warszawa',
      country: 'Polska',
      email: 'uw@uw.edu.pl',
      phoneNumber: '+48 22 552 40 00',
      availableLanguages: ['polski', 'angielski']
    },
    {
      name: 'Uniwersytet Jagielloński',
      description: 'Uniwersytet publiczny',
      address: 'ul. Gołębia 24',
      city: 'Kraków',
      country: 'Polska',
      email: 'uj@uj.edu.pl',
      phoneNumber: '+48 12 663 11 11',
      availableLanguages: ['polski', 'angielski']
    },
    {
      name: 'Harvard University',
      description: 'University in Cambridge',
      address: 'Massachusetts Hall, Cambridge,USs',
      city: 'Cambridge',
      country: 'USA',
      email: 'harvard@harvard.edu',
      phoneNumber: '+1 617-495-1000',
      availableLanguages: ['angielski']
    },
  ];

  displayedColumns: string[] = ['name', 'description', 'address', 'city', 'country', 'email', 'phoneNumber', 'availableLanguages'];

  constructor(private readonly universityService: UniversityService) {
  }

  ngOnInit(): void {
    this.universityService.getAll()
      .pipe(take(1))
      .subscribe(response => {
        this.allUniversities = response;
      });
  }

  public addUniversity(universityModel: UniversityModel) {
    this.allUniversities.push(universityModel);
  }
}
