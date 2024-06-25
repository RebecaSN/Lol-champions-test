import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SummonerSpell } from 'src/app/core/models/pages/summoner-spells/summonerSpell';
import { SummonerSpellsDataService } from 'src/app/core/services/pages/summoner-spells/summoner-spells-data.service';

@Component({
  selector: 'app-summoner-spells',
  templateUrl: './summoner-spells.component.html',
  styleUrls: ['./summoner-spells.component.scss']
})
export class SummonerSpellsComponent implements OnInit {

  summonersList: SummonerSpell[];

  columnDefs = [
    { field: 'id', width: 70 },
    { field: 'summonerLevel', width: 160 },
    { field: 'name', width: 240, },
    { field: 'description', width: 1400, cellRenderer: (params) => this.createTooltipCellRenderer(params)},
  ];

  constructor(
    private http: HttpClient,
    private summonerSpellsDataService: SummonerSpellsDataService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadDataSource();
  }

  loadDataSource():void{
    this.summonerSpellsDataService.getAllSummoresSpells().subscribe(
      (data: any) => {
        this.summonersList = Object.values(data.data);
      }
    );
  }

  createTooltipCellRenderer(params): string {
    const value = params.value;
    const sanitizedValue = this.sanitizer.sanitize(1, value);
    return `<span matTooltip="${sanitizedValue}">${value}</span>`;
  }

}
