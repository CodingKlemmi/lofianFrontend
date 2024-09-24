import { Component } from '@angular/core';
import { DocIdComponent } from "./doc-id/doc-id.component";
import { IpComponent } from "./ip/ip.component";
import { KeywordComponent } from "./keyword/keyword.component";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [DocIdComponent, IpComponent, KeywordComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

}
