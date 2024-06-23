import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Champion } from 'src/app/core/models/pages/champions-list/champion';
import { InMemoryDataServiceService } from 'src/app/core/services/pages/champions-list/inMemoryDataService.service';

@Component({
  selector: 'app-champions-list',
  templateUrl: './champions-list.component.html',
  styleUrls: ['./champions-list.component.css']
})
export class ChampionsListComponent implements OnInit {

  champions: Champion[];

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
    private inMemoryDataServiceService : InMemoryDataServiceService
  ) { }

  ngOnInit() {
    // this.http.get<Champion[]>('/api/champions').subscribe(data => {
    //   this.champions = data;
    // });
    this.loadDataSource();
  }

  removeChampion(id: number): void {
    this.http.delete(`/api/champions/${id}`).subscribe(() => {
      this.champions = this.champions.filter(champion => champion.id !== id);
    });
    console.log('removido')
  }

  loadDataSource():void{
    this.inMemoryDataServiceService.getAllChampions().subscribe(

      (data: any) => {
        // Supondo que os campeões estejam dentro do objeto 'data' conforme o JSON fornecido
        this.champions = Object.values(data.data);
        console.log('Champions:', this.champions);
      // (data: Champion[]) => {
      //   this.champions = data['data'];
      //   console.log('Champions:', this.champions);
      // },
      // (error) => {
      //   console.error('Error loading champions:', error);
      }
    );
  }
}


