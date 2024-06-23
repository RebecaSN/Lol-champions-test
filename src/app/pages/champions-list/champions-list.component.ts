import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Champion } from 'src/app/core/models/pages/champions-list/champion';
import { ChampionsListData } from 'src/app/core/services/pages/champions-list/champions-list-data.service';

@Component({
  selector: 'app-champions-list',
  templateUrl: './champions-list.component.html',
  styleUrls: ['./champions-list.component.scss']
})
export class ChampionsListComponent implements OnInit {

  championsList: Champion[];

  columnDefs = [
    { field: 'id' },
    { field: 'name' },
    { field: 'title' },
    { field: 'tags', cellRenderer: (params) => params.value.join(', ') },
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
    private championsListData : ChampionsListData
  ) { }

  ngOnInit() {
    this.loadDataSource();
  }

  loadDataSource():void{
    this.championsListData.getAllChampions().subscribe(
      (data: any) => {
        this.championsList = Object.values(data.data);
        console.log('Champions:', this.championsList);
      }
    );
  }

  removeChampion(id: number): void {
    this.http.delete(`/api/champions/${id}`).subscribe(() => {
      this.championsList = this.championsList.filter(champion => champion.id !== id);
    });
    console.log('removido')
  }
}


