import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

export interface ListResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiService<T> {
  private url = 'https://pokeapi.co/api/v2';
  private entity: string;

  constructor(protected httpClient: HttpClient, entity: string) {
    this.entity = entity;
  }

  getById(id: string): Observable<T> {
    return this.httpClient.get<T>(`${this.url}/${this.entity}/${id}/`);
  }

  getByUrl(url: string): Observable<T> {
    return this.httpClient.get<T>(url);
  }

  list({ limit, offset }: { limit: number, offset: number} = { limit: 100, offset: 200}): Observable<ListResponse<T>> {
    return this.httpClient.get<ListResponse<T>>(`${this.url}/${this.entity}?limit=${limit}&offset=${offset}`);
  }

  listByUrl(url: string): Observable<ListResponse<T>> {
    return this.httpClient.get<ListResponse<T>>(url);
  }
}
