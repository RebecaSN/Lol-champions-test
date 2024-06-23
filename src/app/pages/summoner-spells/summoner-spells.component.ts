import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    { field: 'id' },
    { field: 'summonerLevel' },
    { field: 'name' },
    { field: 'description'},
     {
      headerName: 'Actions',
      cellRenderer: (params) => {
        return `
          <button mat-icon-button (click)="removeChampion(${params.data.id})">
            <mat-icon>delete</mat-icon>
          </button>
        `;
      }
    }
  ];

  constructor(
    private http: HttpClient,
    private summonerSpellsDataService: SummonerSpellsDataService) { }

  ngOnInit() {
    this.loadDataSource();
  }

  loadDataSource():void{
    this.summonerSpellsDataService.getAllSummoresSpells().subscribe(
      (data: any) => {
        this.summonersList = Object.values(data.data);
        console.log('Champions:', this.summonersList);
      }
    );
  }

}
