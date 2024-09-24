import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-ip',
  standalone: true,
  imports: [ReactiveFormsModule, MatTooltipModule],
  templateUrl: './ip.component.html',
  styleUrl: './ip.component.scss'
})
export class IpComponent {
  ipCtrl: FormGroup;

  constructor(private fb: FormBuilder) {
    this.ipCtrl = this.fb.group({
      octets: this.fb.array([
        new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]?|1[0-9]{2}|2[0-4][0-9]|25[0-5])$')]),
        new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]?|1[0-9]{2}|2[0-4][0-9]|25[0-5])$')]),
        new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]?|1[0-9]{2}|2[0-4][0-9]|25[0-5])$')]),
        new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]?|1[0-9]{2}|2[0-4][0-9]|25[0-5])$')])
      ])
    });
  }

  // Korrekte Typisierung des FormArrays und Zugriffs auf FormControls
  get octets(): FormArray {
    return this.ipCtrl.get('octets') as FormArray;
  }

  getFormControl(index: number): FormControl {
    return this.octets.at(index) as FormControl; // Typisierung als FormControl
  }

  //Service?
  submitIp() {
    if (this.ipCtrl.valid) {
      const ipAddress = this.octets.value.join('.');
      console.log('Die eingegebene IP-Adresse lautet: ', ipAddress);
    }
  }

  //Service!
  enableBtn(): boolean {
    return !this.ipCtrl.valid
  }
}