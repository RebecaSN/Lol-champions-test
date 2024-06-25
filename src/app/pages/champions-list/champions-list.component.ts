import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Champion } from 'src/app/core/models/pages/champions-list/champion';
import { ChampionsListData } from 'src/app/core/services/pages/champions-list/champions-list-data.service';
import { ButtonRendererComponent } from 'src/app/core/services/utilities/button-renderer.component';
import { EditChampionComponent } from './modals/edit-champion/edit-champion.component';
import { ViewChampionComponent } from './modals/view-champion/view-champion.component';
import { DeleteChampionComponent } from './modals/delete-champion/delete-champion.component';
import { fadeInOut } from 'src/app/core/services/utilities/animations.service';

@Component({
  selector: 'app-champions-list',
  templateUrl: './champions-list.component.html',
  styleUrls: ['./champions-list.component.scss'],
  animations: [fadeInOut]
})
export class ChampionsListComponent implements OnInit {

  championsList: Champion[];
  frameworkComponents: any;

  columnDefs = [
    { field: 'id', width: 80  },
    { field: 'name', width: 200 },
    { field: 'title',width: 350  },
    { field: 'tags', width: 210, },
     {
      headerName: 'Actions',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onEdit: this.editChampion.bind(this),
        onRemove: this.removeChampion.bind(this),
        onView: this.viewChampion.bind(this)
      },
      width: 150
    }
  ];

  constructor(
    private http: HttpClient,
    private championsListData : ChampionsListData,
    public dialog: MatDialog,
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
  }

  ngOnInit() {
    this.loadDataSource();
  }

  loadDataSource():void{
    this.championsListData.getAllChampions().subscribe(
      (data: any) => {
        this.championsList = Object.values(data.data);
      }
    );
  }

  removeChampion(params): void {
    const dialogRef = this.dialog.open(DeleteChampionComponent, {
      disableClose: true,
      data: { data:params['rowData']}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.championsList.findIndex(item => item.id === params['rowData'].id);
        if (index !== -1) {
          this.championsList.splice(index, 1);
          this.refreshGrid();
        }
      }
    });
  }

  editChampion(params):void{
    const dialogRef = this.dialog.open(EditChampionComponent, {
      disableClose: true,
      data: { data:params['rowData']}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

       const index = this.championsList.findIndex(item => item.id === params['rowData'].id);

       if (index !== -1) {
        this.championsList[index] = { ...this.championsList[index], ...result };
        this.refreshGrid();
      }
    }
    });
  }

  refreshGrid(): void {
    this.championsList = [...this.championsList];
  }

  viewChampion(params):void{
    const dialogRef = this.dialog.open(ViewChampionComponent, {
      disableClose: true,
      data: { data:params['rowData']}
    });

  }

}


