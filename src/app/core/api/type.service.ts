import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Type } from '@shared/models/type.model';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TypeService extends ApiService<Type> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'type');
  }
}
