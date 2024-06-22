import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Champion, ChampionData } from 'src/app/core/models/pages/champions-list/champion';

const championsData = require('src/assets/json/champion_info_2.json');

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataServiceService {

  constructor(private httpClient: HttpClient) { }

  getAllBank(): Observable<Champion[]> {
    return this.httpClient.get<Champion[]>('./assets/json/banco.json');
  }

  createDb() {
    const championsArray = this.transformChampionsData(championsData);
    return { champions: championsArray };
  }

  private transformChampionsData(data: ChampionData): Champion[] {
    return Object.keys(data.data).map(key => data.data[key]);
  }

}
