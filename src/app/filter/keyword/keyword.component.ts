import { Component, inject } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-keyword',
  standalone: true,
  imports: [ReactiveFormsModule, MatTooltipModule],
  templateUrl: './keyword.component.html',
  styleUrl: './keyword.component.scss'
})
export class KeywordComponent {
  public filterService = inject(FilterService);

  keywordCtrl = new FormControl<string>('',{
    validators: [
      Validators.required, 
      Validators.pattern('^[A-Za-z-0-9]+$')
    ],
  });

  submitKeyword() {
    if (this.keywordCtrl.valid) {
      const keyword = this.keywordCtrl.value;
      console.log('Eingegebenes Suchwort: ', keyword);
    } else {
      console.log('suchwort nicht valide');
    }
  }

}
