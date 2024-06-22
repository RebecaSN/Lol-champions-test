import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banks } from '../app/api-siscontatos/banks';

const bankJson = require('src/assets/json/banco.json');

@Injectable({
  providedIn: 'root'
})
export class LocalJsonService {

  constructor(private httpClient: HttpClient) { }

  getAllBank(): Observable<Banks[]> {
    return this.httpClient.get<Banks[]>('./assets/json/banco.json');
  }
}
