import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DownloadService } from './download.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit{

  private downloadService = inject(DownloadService);
  results: String = '';

  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
      this.loadResults();
  }
  loadResults() {
    this.httpClient.get('http://localhost:8080/results', { responseType: 'text' }).subscribe({
      next: (data) => (this.results = data),
      error: (err) => console.error('Error loading file', err),
    });
  }

  download() {
    this.downloadService.downloadResult().subscribe({
      next: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'results.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 
    error: (error) => {
      console.error('Fehler beim Herunterladen', error);      
    }
  });
  }
}