import { Component, OnInit, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

import { Folder } from '../folder.model';
import { FilterService } from '../filter/filter.service';

@Component({
  selector: 'app-folderlist',
  standalone: true,
  templateUrl: './folderlist.component.html',
  styles: []
})
export class FolderListComponent implements OnInit {
  selectedFolders: string[] = [];

  folders = signal<Folder[] | undefined>(undefined);
  private httpClient = inject(HttpClient);
  
  public filterService = inject(FilterService);
  ngOnInit(): void {
    
    this.httpClient.get<Folder[]>('http://localhost:8080/folders')  
      .subscribe({
        next: (folders) => {
          console.log('Received JSON:', folders); 
          this.folders.set(folders);  // signal aktualisieren
        },
        error: (error) => console.error('Error fetching folder data:', error)
      });
  }

  onCheckboxChange(event: any, folderName: string) {
    if (event.target.checked) {
      // Wenn Checkbox aktiviert, folderName hinzufügen
      this.selectedFolders.push(folderName);
    } else {
      // Wenn Checkbox deaktiviert, folderName entfernen
      this.selectedFolders = this.selectedFolders.filter(name => name !== folderName);
    }
  }

  saveSelectedFolders() {
    // Hier kannst du die ausgewählten Folder-Namen weiterverarbeiten
    console.log('Ausgewählte Folder:', this.selectedFolders);
    // z.B. an einen Service übergeben oder weiterverarbeiten
    const selectedFolderNames = this.selectedFolders; // Liste der ausgewählten Ordnernamen

  this.httpClient.post('http://localhost:8080/folders', selectedFolderNames, {responseType: 'text'
  }).subscribe({
    next: (response) => {
    console.log('Ordnernamen erfolgreich gesendet:', response);
  },
    error: (error) => 
    console.error('Fehler beim Senden der Ordnernamen:', error)
  });
}


}