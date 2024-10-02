import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { InfoService } from '../info-panel/info.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  
  successMsg = signal<string | undefined>(undefined);

  private infoService = inject(InfoService);
  constructor(private httpClient: HttpClient) {};

  private uploadEndpoint: string = 'http://localhost:8080/upload';

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.selectedFile) {
      console.log('Selected file: ', this.selectedFile.name);
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      
      this.httpClient.post(this.uploadEndpoint, formData, {responseType: 'text'}).subscribe({
        next: (response) => {
          console.log('Response:', response);
          this.successMsg.set("Upload erfolgreich.")
          this.infoService.updateViewUpload(this.selectedFile!.name)
          
        },
        error: (error) => {
          console.error('Error:', error);
        },
        complete: () => {
          console.log('Request completed.');
        }
      });
    } else {
      console.log('No file selected.');
    }
  }
}
