import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-renderer',
  template: `
    <mat-icon (click)="onEdit($event)" style="cursor:pointer" fontSet="fa" fontIcon="fa-edit"></mat-icon>
    <mat-icon (click)="onRemove($event)" style="color: #ff0000; cursor:pointer" fontSet="fa" fontIcon="fa-trash-o"></mat-icon>
    <mat-icon (click)="onView($event)" style="cursor:pointer" fontSet="fa" fontIcon="fa-eye"></mat-icon>
    `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  params;
  label: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onEdit($event) {
    if (this.params.onEdit instanceof Function) {
      this.params.onEdit({ event: $event, rowData: this.params.node.data });
    }
  }

  onRemove($event) {
    if (this.params.onRemove instanceof Function) {
      this.params.onRemove({ event: $event, rowData: this.params.node.data });
    }
  }

  onView($event) {
    if (this.params.onView instanceof Function) {
      this.params.onView({ event: $event, rowData: this.params.node.data });
    }
  }
}
