import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.accessToken,
    });
  }

  downloadPdf(url: string): Observable<Blob> {
    return this.http.get(url, {
      headers: this.headers,
      responseType: 'blob',
    });
  }
}
