import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Champion } from 'src/app/core/models/pages/champions-list/champion';
import { ChampionsListData } from 'src/app/core/services/pages/champions-list/champions-list-data.service';

@Component({
  selector: 'app-view-champion',
  templateUrl: './view-champion.component.html',
  styleUrls: ['./view-champion.component.scss']
})
export class ViewChampionComponent implements OnInit {

  championImageUrl: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Champion,
    public dialog: MatDialog,
    private championsListData : ChampionsListData,
    public dialogRef: MatDialogRef<ViewChampionComponent>,
  ) { }

  ngOnInit() {
    this.loadViewData();
  }

  loadViewData():void{
    const versionToUse = '7.18.1';
    this.championImageUrl = this.championsListData.getChampionImageUrl(versionToUse, this.data['data'].name);

  }

}
