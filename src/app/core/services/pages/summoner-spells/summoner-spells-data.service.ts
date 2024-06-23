import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SummonerSpell } from 'src/app/core/models/pages/summoner-spells/summonerSpell';

const summonersData = require('src/assets/json/summoner_spell_info.json');

@Injectable({
  providedIn: 'root'
})
export class SummonerSpellsDataService {

  constructor(private httpClient: HttpClient) { }

  getAllSummoresSpells(): Observable<SummonerSpell[]> {
    return this.httpClient.get<SummonerSpell[]>('assets/json/summoner_spell_info.json');
  }
}
