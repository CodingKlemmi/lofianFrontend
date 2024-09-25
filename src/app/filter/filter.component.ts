import { Component, inject, OnInit } from '@angular/core';
import { DocIdComponent } from "./doc-id/doc-id.component";
import { IpComponent } from "./ip/ip.component";
import { KeywordComponent } from "./keyword/keyword.component";
import { SapIdComponent } from "./sap-id/sap-id.component";
import { FilterService } from './filter.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [DocIdComponent, IpComponent, KeywordComponent, SapIdComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit{
  folders: any[] = []; // Speichert die Ordnerdaten
  public filterService = inject(FilterService);

  ngOnInit(): void {
    // Rufe die Ordnerliste vom Server ab, wenn die Komponente initialisiert wird
    this.filterService.getFolders().subscribe({
      next: (data: any[]) => {
        this.folders = data;
        console.log('Ordner erhalten:', this.folders); // Zum Debuggen
      },
      error: (error: any) => {
        console.error('Fehler beim Abrufen der Ordner:', error);
      },
      complete: () => {
        console.log('Abfrage der Ordner abgeschlossen.');
      }
    });
  }
}