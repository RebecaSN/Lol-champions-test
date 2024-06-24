import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Champion, ChampionData } from 'src/app/core/models/pages/champions-list/champion';
import { map } from 'rxjs/operators';

const championsData = require('src/assets/json/champion_info_2.json');

@Injectable({
  providedIn: 'root'
})
export class ChampionsListData {

  private versionUrl = 'https://ddragon.leagueoflegends.com/api/versions.json';
  private baseUrl = 'https://ddragon.leagueoflegends.com/cdn';

  constructor(private httpClient: HttpClient) { }

  getAllChampions(): Observable<Champion[]> {
    return this.httpClient.get<Champion[]>('assets/json/champion_info_2.json');
  }

  getLatestVersion(): Observable<string> {
    return this.httpClient.get<string[]>(this.versionUrl).pipe(
      map(versions => versions[0])
    );
  }

  getChampionImageUrl(version: string, championId: string): string {
    return `${this.baseUrl}/${version}/img/champion/${championId}.png`;
  }
}
