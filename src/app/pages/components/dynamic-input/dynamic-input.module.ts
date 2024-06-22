import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicInputComponent } from './dynamic-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material/angular-material.module';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
  declarations: [
    DynamicInputComponent
  ],
  exports: [DynamicInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    AngularMaterialModule,

    NgxMaskModule.forChild(),
    NgxCurrencyModule
  ]
})
export class DynamicInputModule { }
