import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {


  private httpClient = inject(HttpClient);

  private uploadEndpoint: string = 'http://localhost:8080/upload';

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.selectedFile) {
      console.log(`Selected file: ${this.selectedFile.name}`);
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.httpClient.post(this.uploadEndpoint, formData, {responseType: 'text'}).subscribe({
        next: (response) => {
          console.log('Response:', response);
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
