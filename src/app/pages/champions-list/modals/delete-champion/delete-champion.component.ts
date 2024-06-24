import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Champion } from 'src/app/core/models/pages/champions-list/champion';

@Component({
  selector: 'app-delete-champion',
  templateUrl: './delete-champion.component.html',
  styleUrls: ['./delete-champion.component.scss']
})
export class DeleteChampionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Champion,
    public dialogRef: MatDialogRef<DeleteChampionComponent>,
  ) { }

  ngOnInit() {

  }

  confirm():void{
    this.dialogRef.close(this.data['data']);

  }

}
