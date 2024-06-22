import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicPanelBodyComponent } from './dynamic-panel-body.component';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    DynamicPanelBodyComponent
  ],
  exports: [DynamicPanelBodyComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AngularMaterialModule,
  ]
})
export class DynamicPanelBodyModule { }
