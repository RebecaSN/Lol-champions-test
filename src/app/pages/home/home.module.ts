import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DynamicPanelBodyModule } from '../components/dynamic-panel-body/dynamic-panel-body.module';

@NgModule({
  declarations: [
    HomeComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlexLayoutModule,

    AngularMaterialModule,
    DynamicPanelBodyModule,
  ]
})
export class HomeModule { }
