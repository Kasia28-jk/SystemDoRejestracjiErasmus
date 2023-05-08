import { Component } from '@angular/core';

@Component({
  selector: 'app-registration-for-erasmus-trip-page',
  templateUrl: './registration-for-erasmus-trip-page.component.html',
  styleUrls: ['./registration-for-erasmus-trip-page.component.scss']
})
export class RegistrationForErasmusTripPageComponent {
  srcResult: any;
  
  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
