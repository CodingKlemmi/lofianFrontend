import { Component } from '@angular/core';
import { DocIdComponent } from "./doc-id/doc-id.component";
import { IpComponent } from "./ip/ip.component";
import { KeywordComponent } from "./keyword/keyword.component";
import { SapIdComponent } from "./sap-id/sap-id.component";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [DocIdComponent, IpComponent, KeywordComponent, SapIdComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

}
