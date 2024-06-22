import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material/angular-material.module';
import { DynamicPanelHeaderComponent } from './dynamic-panel-header.component';

@NgModule({
  declarations: [
    DynamicPanelHeaderComponent
  ],
  exports: [DynamicPanelHeaderComponent],
  imports: [
    CommonModule,

    AngularMaterialModule,
  ]
})
export class DynamicPanelHeaderModule { }
