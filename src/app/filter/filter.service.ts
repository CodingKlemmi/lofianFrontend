import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root',
})
export class FilterService{
    constructor(
        private httpClient: HttpClient,
    ) {};
    private filterValue: any = null;

    savedFilter: string | null = null;

    enableBtn(control: FormControl): boolean {
        return control.valid;
      }

    submitFilter(input: FormControl):void {
        const value = input.value;
        this.filterValue = value;
        console.log(this.filterValue)
    }
}
    

