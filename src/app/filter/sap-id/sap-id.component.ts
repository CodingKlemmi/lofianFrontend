import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { FilterService } from '../filter.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sap-id',
  standalone: true,
  imports: [ReactiveFormsModule, MatTooltipModule],
  templateUrl: './sap-id.component.html',
  styleUrl: './sap-id.component.scss'
})
export class SapIdComponent {
  public filterService = inject(FilterService);
  pattern = '999[0-9A-Za-z]{3}999_[0-9A-Za-z]{2}_[0-9A-Za-z-_]+'

  sapIdCtrl = new FormControl<string>('', {
    validators: [
      Validators.required,
      Validators.pattern(this.pattern)
    ],
  });

  // submitSapId() {
  //   if(this.sapIdCtrl.valid) {
  //     const sapId =this.sapIdCtrl.value;
  //     console.log('SapId lautet:', sapId);
  //   }else{
  //     console.log('fehlerhafte eingabe')
  //   }
  // }
}
