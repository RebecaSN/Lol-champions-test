import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Champion } from 'src/app/core/models/pages/champions-list/champion';
import { TagData } from 'src/app/core/models/pages/champions-list/tag-data';

@Component({
  selector: 'app-edit-champion',
  templateUrl: './edit-champion.component.html',
  styleUrls: ['./edit-champion.component.scss']
})
export class EditChampionComponent implements OnInit {

  championsFormGroup:FormGroup;

  tagsData: TagData[] = [
    { id: 1, tags: ['Fighter','Tank'] },
    { id: 2, tags: ['Fighter','Assassin'] },
    { id: 3, tags: ['Mage','Support'] },
    { id: 4, tags: ['Assassin'] },
    { id: 5, tags: ['Marksman'] },
    { id: 6, tags: ['Mage'] },
    { id: 7, tags: ['Mage','Assassin'] },
    { id: 8, tags: ['Support','Fighter'] },
    { id: 10, tags: ['Support'] },
    { id: 11, tags: ['Mage','Marksman'] },
    { id: 12, tags: ['Mage','Fighter'] },
    { id: 13, tags: [ 'Tank'] },
    { id: 14, tags: [ 'Tank','Mage'] },
    { id: 15, tags: [ 'Marksman','Assassin'] },
    { id: 16, tags: [ 'Marksman','Fighter'] },
    { id: 17, tags: [ 'Marksman','Support'] },
    { id: 18, tags: [ 'Tank','Support'] },
    { id: 19, tags: [ 'Fighter'] },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Champion,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditChampionComponent>,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.createFormGroup(this.data['data']);
  }

  createFormGroup(objectData: Champion): void {
    console.log(objectData)
    this.championsFormGroup = this.fb.group({
      title: objectData.title,
      name: objectData.name,
     // tags:this.fb.array(objectData.tags),
    });
  }

  confirm():void{
    const objectEdit ={
      id:this.data['data'].id,
      title: this.championsFormGroup.get('title')?.value,
      name: this.championsFormGroup.get('name')?.value,
      tags: this.championsFormGroup.get('tags')?.value,
    }

    this.dialogRef.close(objectEdit);
  }

  getFormControl(ctrl: string): FormControl {
    if (this.championsFormGroup) {
      return this.championsFormGroup.get(ctrl) as FormControl;
    }
    return null;
  }
}
