
export interface Champion {
  id: number;
  key: string;
  name: string;
  title: string;
  tags: string[];
}

export interface ChampionData {
  type: string;
  version: string;
  data: { [key: string]: Champion };
}
