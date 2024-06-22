import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicSelectComponent } from './dynamic-select.component';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './pipe/search.pipe';

@NgModule({
  declarations: [
    DynamicSelectComponent,
    SearchPipe
  ],
  exports: [DynamicSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class DynamicSelectModule { }
