import { Component, OnInit, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

import { Folder } from '../folder.model';

@Component({
  selector: 'app-folderlist',
  standalone: true,
  templateUrl: './folderlist.component.html',
  styles: []
})
export class FolderListComponent implements OnInit {
  folders = signal<Folder[] | undefined>(undefined);
  private httpClient = inject(HttpClient);

  ngOnInit(): void {
    // Directly use the array response instead of trying to access a property 'folders'
    this.httpClient.get<Folder[]>('http://localhost:8080/folders')  // No need for {folders: Folder[]}
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error(error.message));
        })
      )
      .subscribe({
        next: (folders) => {
          console.log('Received JSON:', folders); // This should now log the correct array
          this.folders.set(folders);  // Update the signal directly with the array
        },
        error: (error) => console.error('Error fetching folder data:', error)
      });
  }
}