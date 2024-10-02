import { Component } from '@angular/core';
import { UploadComponent } from '../upload/upload.component';
import { FolderListComponent } from '../folderlist/folderlist.component';
import { FilterComponent } from '../filter/filter.component';
import { InfoPanelComponent } from "../info-panel/info-panel.component";
import { ResultsComponent } from '../results/results.component';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [UploadComponent, FolderListComponent, FilterComponent, InfoPanelComponent, ResultsComponent],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent {
  step:number=0;

  onClickNext(){
    
    this.step++;
    if (this.step ==4){
      this.step = 0;
    }
    console.log(this.step)
  }
}


