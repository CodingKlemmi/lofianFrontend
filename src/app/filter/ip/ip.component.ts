import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterService } from '../filter.service';


@Component({
  selector: 'app-ip',
  standalone: true,
  imports: [ReactiveFormsModule, MatTooltipModule],
  templateUrl: './ip.component.html',
  styleUrl: './ip.component.scss'
})
export class IpComponent {
  public filterService = inject(FilterService);

  ipCtrl = new FormControl<string>('',{
    validators: [
      Validators.required, 
      Validators.pattern(`^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`)
    ],
  });

}
