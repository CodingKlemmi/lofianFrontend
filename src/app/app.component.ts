import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { HeaderComponent } from './header/header.component';
import { UploadComponent } from './upload/upload.component';
import { FolderListComponent } from "./folderlist/folderlist.component";
import { FilterComponent } from "./filter/filter.component";
import { DocIdComponent } from "./filter/doc-id/doc-id.component";
import { InfoPanelComponent } from "./info-panel/info-panel.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ControlPanelComponent,
    HeaderComponent,
    UploadComponent,
    FolderListComponent,
    FilterComponent,
    DocIdComponent,
    InfoPanelComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LoFiAn';
}
