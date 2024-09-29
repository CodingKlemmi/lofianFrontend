import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-info-panel',
  standalone: true,
  imports: [],
  templateUrl: './info-panel.component.html',
  styleUrl: './info-panel.component.scss'
})

export class InfoPanelComponent implements OnInit {
  zipFile: string = '';
  selectedFolders: string[] = [];
  filterInput: string = '';
  private subscription!: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Interval auf 1 Sekunde setzen (1000 ms)
    this.subscription = interval(1000).subscribe(() => {
      this.loadInfoData();
    });
  }

  ngOnDestroy(): void {
    // Beende das Intervall, wenn die Komponente zerstört wird, um Speicherlecks zu vermeiden
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadInfoData(): void {
    this.http.get<any>('http://localhost:8080/info').subscribe({
      next: (data) => {
        this.zipFile = data.zipFile;
        this.selectedFolders = data.selectedFolders;
        this.filterInput = data.filterInput;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Info-Daten', error);
      }
    });
  }
}