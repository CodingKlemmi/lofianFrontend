import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-doc-id',
  standalone: true,
  imports: [ReactiveFormsModule, MatTooltipModule],
  templateUrl: './doc-id.component.html',
  styleUrl: './doc-id.component.scss'
})
export class DocIdComponent {
  
  DocIdCtrl = new FormControl('', {
    validators: [
      Validators.required,
      Validators.pattern('[0-9A-Za-z-+ ]*')
      ],
    }
  );

  submitDocId() {
    if (this.DocIdCtrl.valid) {
      const docId = this.DocIdCtrl.value;
      console.log('DocID:', docId)
    }else{
      console.log('flasches Eingabemuster');
    }
  };

  enableBtn(): boolean {
    return !this.DocIdCtrl.valid
  }
}
