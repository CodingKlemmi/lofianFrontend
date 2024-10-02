import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class DownloadService {

    constructor(private httpClient:HttpClient) {};

    downloadResult() {
        return this.httpClient.get('http://localhost:8080/results', {responseType: 'blob'});
    }
}