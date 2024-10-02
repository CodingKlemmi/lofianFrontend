import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Folder } from '../folder.model';
import { Observable } from "rxjs";
import { InfoService } from "../info-panel/info.service";

@Injectable({
    providedIn: 'root',
})
export class FilterService{
    constructor(private httpClient: HttpClient) {};
    private infoService = inject(InfoService);
    filterEndpoint = 'http://localhost:8080/filter';

    private filterValue: any = null;


    getFolders(): Observable<any[]> {
        return this.httpClient.get<any[]>(this.filterEndpoint);
      }
    

    submitFilter(input: FormControl):void {
        const value = input.value;
        this.filterValue = value;
        console.log(this.filterValue)

        this.sendFilterToBackend();
    }

    private sendFilterToBackend(): void {
      console.log("zum backend", this.filterValue);
        const requestBody = { filter: this.filterValue };  // JavaScript Object
        console.log(requestBody);
        this.httpClient.post(this.filterEndpoint, requestBody, { responseType: 'text' }) //javascript object wird zu json 
        .subscribe({
          next: (response) => {
            console.log('Filter erfolgreich an das Backend gesendet:', response);
            this.infoService.updateViewFilter(this.filterValue)
          },
          error: (error) => {
            console.error('Fehler beim Senden des Filters:', error);
          },
          complete: () => {
            console.log('Request completed.');
            
          } 
    });
    }
    

    enableBtn(control: FormControl): boolean {
        return control.valid;
      }
}
    

