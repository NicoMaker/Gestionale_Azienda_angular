import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/** Client delle API REST. Gli URL sono relativi (/api/...): in sviluppo li inoltra proxy.conf.json. */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/';

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.base + url);
  }
  post<T>(url: string, body: unknown): Observable<T> {
    return this.http.post<T>(this.base + url, body);
  }
  put<T>(url: string, body: unknown): Observable<T> {
    return this.http.put<T>(this.base + url, body);
  }
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.base + url);
  }
}
