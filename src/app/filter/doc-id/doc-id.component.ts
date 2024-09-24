import { Component, inject } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterService } from '../filter.service';


@Component({
  selector: 'app-doc-id',
  standalone: true,
  imports: [ReactiveFormsModule, MatTooltipModule],
  templateUrl: './doc-id.component.html',
  styleUrl: './doc-id.component.scss'
})
export class DocIdComponent {  
  public filterService = inject(FilterService); 
  
  DocIdCtrl = new FormControl('', {
    validators: [
      Validators.required,
      Validators.pattern('[0-9A-Za-z-+ ]*')
      ],
    }
  );
}