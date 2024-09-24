import { Component } from '@angular/core';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [UploadComponent],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent {

}
