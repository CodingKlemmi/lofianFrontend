import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class InfoService {

    private viewFilterSubject = new BehaviorSubject<String>('');
    private viewUploadSubject = new BehaviorSubject<String>('');
    private selectedFoldersSubject = new BehaviorSubject<string[]>([]);

    filterObserv$ = this.viewFilterSubject.asObservable();
    uploadObserv$ = this.viewUploadSubject.asObservable();
    selectedFolders$ = this.selectedFoldersSubject.asObservable();


    updateViewFilter(value: string) {
        this.viewFilterSubject.next(value);
     }

    updateViewUpload(value: string) {
        this.viewUploadSubject.next(value);
    }
      
    updateSelectedFolders(folders: string[]) {
        // Ersetzt das gesamte Array mit einem neuen Satz von Ordnern
        this.selectedFoldersSubject.next(folders);
    }

      
}