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
    { id: 1, tags: ['Tank'] },
    { id: 2, tags: ['Fighter'] },
    { id: 3, tags: ['Mage',] },
    { id: 4, tags: ['Assassin'] },
    { id: 5, tags: ['Marksman'] },
    { id: 10, tags: ['Support'] },
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
      tags:this.fb.control(objectData.tags),
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
