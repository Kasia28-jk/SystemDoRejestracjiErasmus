import { Component } from '@angular/core';
import { UniversityModel } from "../../../../model/university.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserContextService } from "../../../../../../core/services/user-context.service";

@Component({
  selector: 'app-universities-list',
  templateUrl: './universities-list.component.html',
  styleUrls: ['./universities-list.component.scss']
})
export class UniversitiesListComponent {

  token$: any;

  universities: UniversityModel[] = [
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

  constructor(private httpClient: HttpClient, private userContextService: UserContextService) {
  }

  temp() {
    this.userContextService.getUserToken().subscribe((accessToken) => {
      console.log(accessToken);
      const httpHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      });
      this.httpClient.get<any>("/api/v1/universities/all", { headers: httpHeaders }).subscribe((response) => {
        console.log(response);
      });
    });
  }
}
