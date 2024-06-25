import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDataTableComponent } from './dynamic-data-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material/angular-material.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [DynamicDataTableComponent],
  exports: [DynamicDataTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NgxMaskModule.forChild(),

    AngularMaterialModule
  ],
})
export class DynamicDataTableModule { }
