import { SummonerSpell } from "./summonerSpell";

export interface Champion {
  id?: number;
  key?: string;
  name?: string;
  title?: string;
  tags?: string[];
  summonerSpells?: SummonerSpell[];
}

export interface ChampionData {
  type: string;
  version: string;
  data: { [key: string]: Champion };
}
