import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { InfoService } from './info.service';


@Component({
  selector: 'app-info-panel',
  standalone: true,
  imports: [],
  templateUrl: './info-panel.component.html',
  styleUrl: './info-panel.component.scss'
})

export class InfoPanelComponent implements OnInit {

  viewFilter: String = '';
  viewUpload: String = '';
  viewSelectedFolder: String = '';
  selectedFolders: string[] = [];


  constructor(private infoService: InfoService) {};

  ngOnInit(): void {

    // Abonniere die Variablen aus dem SharedService
    this.infoService.filterObserv$.subscribe(value => {
      this.viewFilter = value;
    });

    this.infoService.uploadObserv$.subscribe(value => {
      this.viewUpload = value;
    });

    this.infoService.selectedFolders$.subscribe(folders => {
      this.selectedFolders = folders;
    });
      
  }

}