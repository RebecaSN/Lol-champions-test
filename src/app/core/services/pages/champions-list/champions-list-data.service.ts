import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Champion } from 'src/app/core/models/pages/champions-list/champion';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChampionsListData {

  private baseUrl = 'https://ddragon.leagueoflegends.com/cdn';
  private championsUrl = '/api/champions';

  constructor(private httpClient: HttpClient) { }

  getAllChampions(): Observable<Champion[]> {
    return this.httpClient.get<Champion[]>(this.championsUrl);
  }

  getChampionImageUrl(version: string, championId: string): string {
    return `${this.baseUrl}/${version}/img/champion/${championId}.png`;
  }
}
