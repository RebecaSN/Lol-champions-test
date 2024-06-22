import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutBaseRoutingModule } from './layout-base-routing.module';
import { LayoutBaseComponent } from './layout-base.component';
import { ComponentsModule } from '../components/components.module';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    LayoutBaseComponent,
  ],
  imports: [
    CommonModule,
    LayoutBaseRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,


    ComponentsModule,
    NgxMaskModule.forChild(),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class LayoutBaseModule { }
