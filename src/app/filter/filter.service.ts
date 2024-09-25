import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Folder } from '../folder.model';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class FilterService{
    constructor(private httpClient: HttpClient) {};
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
        const requestBody = { filter: this.filterValue };  // JavaScript Object
        this.httpClient.post(this.filterEndpoint, requestBody, { responseType: 'text' }) //javascript object wird zu json 
        .subscribe({
          next: (response) => {
            console.log('Filter erfolgreich an das Backend gesendet:', response);
          },
          error: (error) => {
            console.error('Fehler beim Senden des Filters:', error);
          }
    });
    }
    

    enableBtn(control: FormControl): boolean {
        return control.valid;
      }
}
    

