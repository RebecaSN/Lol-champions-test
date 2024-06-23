import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Champion, ChampionData } from 'src/app/core/models/pages/champions-list/champion';

const championsData = require('src/assets/json/champion_info_2.json');

@Injectable({
  providedIn: 'root'
})
export class ChampionsListData {

  constructor(private httpClient: HttpClient) { }

  getAllChampions(): Observable<Champion[]> {
    return this.httpClient.get<Champion[]>('assets/json/champion_info_2.json');
  }

}
